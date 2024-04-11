import React from "react";
import Image from "next/image";
import { BsSave } from "react-icons/bs";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import PostImageViewer from "../(root)/create/components/PostImageViewer";
import { formatDateString } from "../utils/date";
import { PostData } from "../types/postTypes";
import Link from "next/link";
import LikeButton from "./LikeButton";

interface PostCardProps {
  id: string;
  likedIds: string[];
  likesCount: number;
  author: {
    profileImage: string;
    _id: string;
    username: string;
  };
  tags?: string[];
  group?: string;
  repliesCount: number;
  images: string[];
  createdAt: Date;
  content: string;
}

const PostCard = ({
  id,
  likedIds,
  likesCount,
  author,
  tags,
  group,
  repliesCount,
  images,
  createdAt,
  content,
}: PostCardProps) => {
  let liked = likedIds?.indexOf(author._id);

  return (
    <div
      className="border-b-2 border-r-2 bg-white overflow-hidden flex cursor-pointer
    "
    >
      <div className="hidden md:flex md:flex-col md:p-2 md:items-center">
        <Image
          src={author.profileImage}
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
              src={author.profileImage}
              width={50}
              height={50}
              className="rounded-full bg-blue-400"
              alt={"profile"}
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between w-full items-center">
            <div className="flex items-center text-gray-400">
              <span className="ml-2">{author.username}</span>
            </div>
            <div className="text-sm text-gray-400">
              {formatDateString(createdAt.toDateString())}
            </div>
          </div>
        </div>

        <div className="flex flex-row h-full">
          <div className="w-full flex flex-col justify-between items-center">
            <div className="overflow-hidden">
              {images.length ? (
                <PostImageViewer images={images as string[]} />
              ) : (
                <span></span>
              )}
            </div>

            <p
              className="text-gray-700 text-left"
              dangerouslySetInnerHTML={{
                __html:
                  content.length > 305
                    ? content.substring(0, 305) + "..."
                    : content,
              }}
            ></p>
            <div className="p-3 text-black text-sm flex flex-row items-center justify-between w-full">
              <LikeButton liked={liked} likesCount={likesCount} postId={id} />
              <Link
                href={`/post/${id}`}
                className=" flex cursor-pointer justify-center items-center gap-2"
              >
                <FaRegCommentDots
                  style={{ height: "25px", width: "25px" }}
                  className="fill-green-600 cursor-pointer"
                />
                <span>
                {repliesCount}
                </span>
              </Link>

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
