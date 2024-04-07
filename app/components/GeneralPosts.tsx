
import { getAllPost } from '@/actions/post.action'
import React from 'react'
import PostCard from './PostCard';

const GeneralPosts = async() => {
    const posts:any[] = await getAllPost();
  return (
    <div className="flex flex-1 flex-col sm:pb-5 p-2">
             {posts?.map((post, index) => (
          <div key={index} className="w-full my-2">
            <PostCard postData={{ ...post, _id: post._id as string }} />
          </div>
        ))}
    </div>
  )
}

export default GeneralPosts
