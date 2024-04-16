import { getPostComments } from '@/actions/post.action'
import React from 'react'
import PostCard from './PostCard';

const CommentSection = async({postId}:{postId:string}) => {

    const comments = await getPostComments(postId);
  return (
    <div className='w-full md:w-2/3 border-l-2'>
      {
        comments.map((comment,key) => <PostCard 
        key={key}
        author={comment.author}
        content={comment.content}
        createdAt={comment.createdAt}
        id={comment._id}
        likesCount={comment.likesCount}
        repliesCount={comment.repliesCount}
        likedIds={comment.likedIds}
        />)
      }
    </div>
  )
}

export default CommentSection
