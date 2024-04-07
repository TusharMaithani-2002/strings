import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { FaRegShareFromSquare } from "react-icons/fa6";
import PostImageViewer from "./PostImageViewer";
interface PostData {
  _id: string;
  content: string;
  images: any[];
  mentions: any[] | undefined;
  replies: any[] | undefined;
  tags: string[];
  group: any;
  author: {
    username: string;
    profileImage: string;
  };
  likesCount: number;
  createdAt: Date;
}

interface PostCardProps {
  postData: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ postData }) => {
  const router = useRouter();
  const [like, setLike] = useState(false);

  const handleLikeToggle = () => {
    setLike((prevLike) => !prevLike);
  };

  return (
    <div className="h-[400px] border-2 mx-auto w-1/2 border-lime-600 bg-white shadow-md rounded-xl overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 relative">
      <div className="p-3 absolute top-0 left-0 w-full flex items-center justify-between z-10">
        <div className="flex items-center">
          <Image
            src={postData.author.profileImage}
            alt={postData.author.username}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="ml-2">{postData.author.username}</span>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(postData.createdAt).toString()}
        </div>
      </div>
      <div className="relative h-5/6 z-0">
        <Image
          src={postData.images[0]} // Assuming the first image is the main image
          alt={`Image`}
          layout="fill"
          objectFit="fill"
          className="z-0"
        />
      </div>
      <div className="p-3 z-10 mt-2 text-black text-sm flex flex-row items-center justify-between">
        <div className="flex items-center">
          <button onClick={handleLikeToggle}>
            {like ? (
              <BsFillHeartFill
                style={{ color: "red", height: "25px", width: "25px" }}
              />
            ) : (
              <BsHeart
                style={{ color: "red", height: "25px", width: "25px" }}
              />
            )}
          </button>
          <span className="ml-2">{postData.likesCount}</span>
        </div>
        <div
          className=" block cursor-pointer justify-center items-center"
          onClick={() => router.push(`/post/${postData._id}`)}
        >
          <p className="text-gray-700 text-base">{postData.content}</p>
        </div>
        <div
          className=" block cursor-pointer  justify-center items-center"
          onClick={() => router.push(`/post/${postData._id}`)}
        >
          <p>Comment</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="mr-1">
            <FaRegShareFromSquare style={{ height: "20px", width: "20px" }}/>
          </p>
          <p className="ml-1">
            <BsSave style={{ height: "20px", width: "20px" }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
