"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import PostImageViewer from "../(root)/create/components/PostImageViewer";
import { formatDateString } from "../utils/date";

interface PostData {
  _id: string;
  content: string;
  images: string[];
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
    <div
      className="border-2 bg-white shadow-md rounded-xl overflow-hidden flex
    "
    >
      <div className="hidden md:flex md:flex-col md:p-2 md:items-center">
        <Image
          src={postData.author.profileImage}
          width={50}
          height={50}
          className="rounded-full bg-blue-400"
          alt={"profile"}
        />
        <div className="sm:hidden md:block md:border-r md:border-gray-300 md:h-[85%] " />
      </div>

      <div className="flex flex-col w-full py-2 px-5">
        <div className="w-full flex items-center justify-between px-3 pb-3">
          <div className="md:hidden ">
            <Image
              src={postData.author.profileImage}
              width={50}
              height={50}
              className="rounded-full bg-blue-400"
              alt={"profile"}
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between w-full items-center">
            <div className="flex items-center text-gray-400">
              <span className="ml-2">{postData.author.username}</span>
            </div>
            <div className="text-sm text-gray-400">
              {formatDateString(postData.createdAt.toDateString())}
            </div>
          </div>
        </div>

        <div className="flex flex-row h-full">
          <div className="w-full flex flex-col justify-between items-center">
            <div className="overflow-hidden">
              {postData?.images.length ? (
                <PostImageViewer images={postData.images as string[]} />
              ) : (
                <span></span>
              )}
            </div>

            <p
              className="text-gray-700 text-left"
              dangerouslySetInnerHTML={{ __html:postData.content.length > 305 ? postData.content.substring(0,305)+"..." :postData.content}}
            ></p>
            <div className="p-3 text-black text-sm flex flex-row items-center justify-between w-full">
              <div className="flex items-center">
                <button onClick={handleLikeToggle}>
                  {like ? (
                    <BsFillHeartFill
                      style={{ color: "red", height: "25px", width: "25px" }}
                    />
                  ) : (
                    <BsHeart
                      style={{ height: "25px", width: "25px" }}
                      className="fill-green-600"
                    />
                  )}
                </button>
                <span className="ml-2">{postData.likesCount}</span>
              </div>
              <div
                className=" block cursor-pointer  justify-center items-center"
                onClick={() => router.push(`/post/${postData._id}`)}
              >
                <FaRegCommentDots
                  style={{ height: "25px", width: "25px" }}
                  className="fill-green-600 cursor-pointer"
                />
              </div>

              <div>
                <FaRegShareFromSquare
                  style={{ height: "25px", width: "25px" }}
                  className="fill-green-600 cursor-pointer"
                />
              </div>

              <div className="ml-1">
                <BsSave
                  style={{ height: "25px", width: "25px" }}
                  className="fill-green-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
