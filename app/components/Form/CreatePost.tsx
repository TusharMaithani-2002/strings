"use client";
import { uploadImage } from "@/app/utils/uploadImage";
import { addPost } from "@/actions/post.action";
import React, { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageViewer from "../ImageViewer";
import Select from "react-select";
import { useAppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import LoadingSpinner from "../LoadingSpinner";
// value:user mongo id, label:username
const userData = [
  "tushar",
  "maithani",
  "leonardo",
  "emma",
  "scarlett",
  "ryan reynolds",
];
const groupData = [
  "avengers",
  "justice league",
  "suicide squad",
  "revengers",
  "wakanda",
  "spidy verse",
];

const users = userData.map((user) => ({ label: user, value: user }));
const groups = groupData.map((group) => ({ label: group, value: group }));
const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [mentions, setMentions] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [group, setGroup] = useState<any | null>(null); // group id
  const [loading,setLoading] = useState(false);
  const { user } = useAppContext();
  const router = useRouter();


  const handleSubmit = async () => {

    if(!user) return;
    if(images?.length === 0 && content?.length === 0) return;
    let mentionedUser: any[] = mentions?.map((mention) => mention.value);
    const data = {
      content,
      images: images,
      mentions: mentionedUser,
      tags,
      group: group?.value,
      author: user._id,
    };
    const postData = await addPost(data);
    if (postData.success) router.push("/home");
    return postData;
  };

  const convertFileToDataUrl = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log("loading");
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const hanldeFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);

    files.forEach(async(image,i) => {
      // setImages((prev) => [...prev, URL.createObjectURL(image)]);
      
      await handleImage(image);
      
      
    });
   
  };

  const handleImage = async(image) => {
    const reader = new FileReader();
    reader.onloadend = async() => {
      setLoading(true);
      const newImage = await uploadImage(reader.result)
      setImages(prev => [...prev,newImage]);
      setLoading(false);
    }
    reader.readAsDataURL(image)
  }

  const uploadImagestoCloudinary = async () => {
    try {
      const convertedFiles = await Promise.all(
        files.map(async (image) => {
          const dataUrl = await convertFileToDataUrl(image);
          return dataUrl;
        })
      );
      const uploadedImageUrls: string[] = [];
      convertedFiles.map(async (image) => {
        const uploadedUrl = await uploadImage(image);
        uploadedImageUrls.push(uploadedUrl);
      });

      return uploadedImageUrls;
    } catch (error) {
      console.log("error while converting image files");
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleAddTag = () => {
    if (inputValue.trim()) setTags([...tags, inputValue.trim()]);
    setInputValue("");
  };
  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form
      className="flex flex-col items-center p-3 max-h-[calc(100vh-160px)] overflow-x-hidden 
      z-0 md:max-h-[calc(100vh-80px)] overflow-y-auto
      "
      action=""
    >
      <div className="text-2xl text-green-500 m-2 font-bold">Create Post</div>
      <div className="flex justify-center w-full m-3">
        {images && <ImageViewer images={images} />}
      </div>
      <div>
        <label
          htmlFor="input-file"
          className="  "
        >
          <span className="flex bg-green-500 text-white rounded-md p-2">{loading && <LoadingSpinner />}upload image</span>
        </label>
        <input
          type="file"
          id="input-file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={hanldeFileChange}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full md:w-2/3 mt-5 items-center">
        <div>
          <Select
            options={users}
            isMulti
            value={mentions}
            onChange={setMentions}
            className="w-[300px]"
            placeholder="mention someone"
            loadingMessage={"loading users"}
          />
        </div>

        <div>
          <Select
            options={groups}
            value={group}
            onChange={setGroup}
            className="w-[300px]"
            placeholder="mention group"
            loadingMessage={"loading groups"}
          />
        </div>
      </div>

      <div className="flex justify-center items-center w-full">

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="w-[100%] md:w-2/3 m-4 mb-5 md:overflow-y-auto"
        placeholder="enter your thoughts"
      />
      </div>

      <div className="flex flex-col items-center justify-center p-5 ">
        <div className="flex flex-wrap w-full md:w-[400px] gap-1 p-2">
          {tags.length
            ? tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-orange-500 text-white p-2 rounded-lg"
                >
                  <span className="m-1 font-semibold">{tag}</span>
                  <button type="button" onClick={() => handleTagRemove(tag)}>
                    &times;
                  </button>
                </span>
              ))
            : ""}
        </div>
        <div className="flex w-[300px] justify-around">
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Add tags..."
            className="outline-none rounded-md text-red-600 m-1 p-2 text-sm font-bold focus:border-b-2 focus:border-orange-400 bg-gray-200 h-full"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-green-500 text-white px-4 m-1 rounded-md shadow-md hover:bg-green-700 transition duration-300 "
          >
            Add
          </button>
        </div>
      </div>

      {/* <button
        type="submit"
        className="bg-green-500 text-white p-2 px-4 rounded-md mt-3
        hover:bg-green-700
        "
      >
        submit
      </button> */}

      <Button type="button"
        className="bg-green-500 text-white p-2 px-4 rounded-md mt-3
        hover:bg-green-700
        "
        clickAction={()=>handleSubmit()}
        >
          submit
      </Button>
    </form>
  );
};

export default CreatePost;
