import { getPost } from '@/actions/post.action';
import CommentSection from '@/app/components/CommentSection';
import Comment from '@/app/components/Form/Comment';
import PostCard from '@/app/components/PostCard';
import React from 'react'

const pages = async ({params}:{params:{postId:string}}) => {
  if(!params.postId) return;

  const post = await getPost(params.postId);
  return (
    <div className='w-full flex flex-col items-center overflow-y-auto overflow-x-hidden max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-80px)]'>
      <div className='w-full md:w-2/3'><PostCard
          id={post._id}
          author={post.author}
          content={post.content}
          images={post.images}
          likedIds={post.likedIds}
          likesCount={post.likesCount}  
          repliesCount={post.repliesCount}
          createdAt={post.createdAt}
          parent={post.parent}
          showFullContent={true}
      /></div>
      <div className="w-full md:w-2/3"><Comment parentId={post._id}/></div>
      <CommentSection postId={post._id}/>
    </div>
  )
}

export default pages
