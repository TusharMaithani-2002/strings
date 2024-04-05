"use client";
import { uploadImage } from "@/app/utils/uploadImage";
import { addPost } from "@/actions/post.action";
import React, { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageViewer from "../ImageViewer";
import Select from "react-select";
import { useAppContext } from "@/app/context/context";
import { Schema } from "mongoose";
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
  const [files, setFiles] = useState<any[]>([]);
  const [mentions, setMentions] = useState<Schema.Types.ObjectId[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [group, setGroup] = useState<Schema.Types.ObjectId | null>(null); // group id
  const {user,setUser} = useAppContext();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      content,
      images,
      mentions,
      tags,
      group,
      author : user
    };
  
    const postData = await addPost(data);
    console.log("hello");
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
    setFiles(files);

    files.forEach((image) => {
      setImages((prev) => [...prev, URL.createObjectURL(image)]);
    });
  };

  const uploadImagestoCloudinary = async () => {
    try {
      const convertedFiles = await Promise.all(
        files.map(async (image) => {
          const dataUrl = await convertFileToDataUrl(image);
          return dataUrl;
        })
      );
      const uploadedImageUrls: any[] = [];
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
  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form
      onSubmit={(e)=>handleSubmit(e)}
      className="flex flex-col items-center p-3 max-h-[100vh-80px] overflow-x-hidden overflow-y-scroll"
    >
      <div className="text-2xl text-red-500 m-2">Create Post</div>
      <div className="flex justify-center w-full m-3">
        {images && <ImageViewer images={images} />}
      </div>
      <div>
        <label
          htmlFor="input-file"
          className="bg-red-500 text-white rounded-md p-2 "
        >
          upload image
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

      <div className="flex flex-col md:flex-row justify-between w-2/3 mt-5">
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
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="w-2/3 m-2 mb-5 text-lg text-black"
        placeholder="enter your thoughts"
      />

      <div className="flex flex-col items-center justify-center p-5 ">
        <div className="flex flex-wrap w-[400px] gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-orange-500 text-white p-2 rounded-lg"
            >
              <span className="m-1 font-semibold">{tag}</span>
              <button type="button" onClick={() => handleTagRemove(tag)}>
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add tags..."
          className="outline-none rounded-md text-red-600 m-1 p-2 text-sm font-bold focus:border-b-2 focus:border-orange-400
        bg-gray-200
        "
        />
      </div>

      <button
        type="submit"
        className="bg-red-500 text-white p-2 px-4 rounded-md mt-3
        hover:bg-red-600
        "
      >
        submit
      </button>
    </form>
  );
};

export default CreatePost;