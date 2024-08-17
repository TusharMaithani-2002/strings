import React from "react";
import Image from "next/image";
import { BsSave } from "react-icons/bs";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import PostImageViewer from "../(root)/create/components/PostImageViewer";
import { formatDateString } from "../utils/date";
import Link from "next/link";
import LikeButton from "./LikeButton";
import PostSetting from "./PostSetting";
import SavePost from "./SavePost";
import CarouselImageViewer from "./CarouselImageViewer";


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
  images?: string[];
  createdAt: Date;
  content: string;
  parent?:string;
  showFullContent?:boolean;
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
  parent,
  showFullContent
}: PostCardProps) => {
  // let liked = likedIds?.indexOf(author._id);

  const revalidatePathLink = () => {
    if(showFullContent) return `/post/${id}`
    else return `/post/${parent}`;
  }

  return (
    <div
      className=" bg-[rgba(16,16,16,1)] overflow-hidden flex text-white mb-2
    "
    >
      <div className="hidden md:flex md:flex-col md:p-2 md:items-center"
      >
        <Link
        href={`/profile/${author._id}`}
        >
        <Image
          src={author.profileImage}
          width={50}
          height={50}
          className="rounded-full bg-blue-400"
          alt={"profile"}
        />
        </Link>
        <div className="sm:hidden md:block md:border-r md:border-gray-300 md:h-[85%] " />
      </div>

      <div className="flex flex-col w-full py-2 px-5">
        <div className="flex items-center">
          <div className="w-full flex items-center justify-evenly px-3">
            <div className="md:hidden">
              <Image
                src={author.profileImage}
                width={50}
                height={50}
                className="rounded-full bg-blue-400"
                alt={"profile"}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between w-2/3 items-center">
              <div className="flex items-center text-gray-400">
                <span className="ml-2">{author.username}</span>
              </div>
              <div className="text-sm text-gray-400">
                {formatDateString(createdAt.toDateString())}
              </div>
            </div>
          </div>


        <PostSetting postId={id} parent={parent} author={author._id}/>

        </div>

        <div className="flex flex-row h-full mt-2">
          <div className="w-full flex flex-col justify-between items-center">
            <div className="overflow-hidden">
              {images?.length ? (
                <CarouselImageViewer images={images as string[]} />
              ) : (
                <span></span>
              )}
            </div>

            <p
              className=" text-left"
              dangerouslySetInnerHTML={{
                __html:
                  !showFullContent && content.length > 305
                    ? content.substring(0, 305) + "..."
                    : content,
              }}
            ></p>
            <div className="p-3 text-black text-sm flex flex-row items-center justify-between w-full">
              <LikeButton likedIds={likedIds} likesCount={likesCount} postId={id} path={revalidatePathLink()} />
              <Link
                href={`/post/${id}`}
                className=" flex cursor-pointer justify-center items-center gap-2"
              >
                <FaRegCommentDots
                  style={{ height: "25px", width: "25px" }}
                  className="fill-[#E90064] cursor-pointer"
                />
                <span className="text-white">{repliesCount}</span>
              </Link>

              <div>
                <FaRegShareFromSquare
                  style={{ height: "25px", width: "25px" }}
                  className="fill-[#E90064] cursor-pointer"
                />
              </div>

              <SavePost postId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
