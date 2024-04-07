"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/app/context/context";
import { useRouter } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import { getAllPost } from "@/actions/post.action";
const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  if (status === "unauthenticated") router.push("/");
  console.log(session);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPost();
      setPosts(posts);
    };
    fetchPosts();
  }, []);
  const { user } = useAppContext();
  return (
    <div className="overflow-auto max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-80px)]">
      home
      {session && (
        <div>
          <p>we are logged in.. do you want to log out?</p>
          <p>User : {user?.username}</p>
        </div>
      )}
      <div className="flex flex-wrap">
        {posts?.map((post, index) => (
          <div key={post._id} className="w-full mb-4 mt-4">
            <PostCard postData={{ ...post, _id: post._id }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
