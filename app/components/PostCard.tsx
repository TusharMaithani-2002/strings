import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserName } from "@/actions/user.action";
import ImageViewer from "./ImageViewer";
import { useRouter } from "next/navigation";

interface PostData {
  _id: string;
  content: string;
  images: any[];
  mentions: any[] | undefined;
  tags: string[];
  group: any;
  author: any;
}

interface PostCardProps {
  postData: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ postData }) => {
  const [userName, setUserName] = useState<string>("user");
  const router = useRouter();
  useEffect(() => {
    getAuthorName(postData.author);
  }, [postData]);
  const getAuthorName = async (author: string) => {
    const username = await getUserName(author);
    setUserName(username);
  };
  return (
    <div className="h-[400px] border-2 border-lime-600 bg-white shadow-md rounded-xl overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
      <div className="relative p-3 pt-6 flex flex-col justify-center items-center">
        {postData.images && <ImageViewer images={postData.images} />}
        <div className="absolute top-0 right-0 p-1 z-10 text-black text-sm font-bold">
          {userName}
        </div>
        <div
          className="px-6 py-4 block cursor-pointer"
          onClick={() => router.push(`/post/${postData._id}`)}
        >
          <p className="text-gray-700 text-base">{postData.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
