"use client";
import { getAllMentionedPosts } from "@/actions/user.action";
import PostCard from "@/app/components/PostCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  likedIds: string[];
  likesCount: number;
  author: any;
  tags: string[];
  repliesCount: number;
  group: string;
  images: string[];
  createdAt: string;
  content: string;
}
const MentionPosts = ({ userId }: { userId: string }) => {
  console.log('mentions')
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await axios.get(`/api/clientrequest/mentionedPosts/${userId}`)
      console.log(data.data)
      setPosts(data.data);
    };
    fetchPosts();
    console.log('fetching mentions')
  }, [userId]);
  return (
    <div className="flex flex-1 flex-col sm:pb-5">
      {posts?.map((post, index: number) => (
        <div key={index} className="w-full">
          <PostCard
            id={post._id}
            likedIds={post.likedIds}
            likesCount={post.likesCount}
            author={post.author}
            tags={post.tags}
            group={post.group}
            repliesCount={post.repliesCount}
            images={post.images}
            createdAt={new Date(post.createdAt)}
            content={post.content}
          />
        </div>
      ))}
    </div>
  );
};

export default MentionPosts;
