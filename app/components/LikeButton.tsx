"use client";
import { updatePostLikes } from '@/actions/post.action';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

interface Props {
    likedIds:string[];
    likesCount:number;
    path?:string;
    postId:string
}

const LikeButton = ({likedIds,likesCount,postId,path}:Props) => {
    const {data:session} = useSession()

    const [likes,setLikes] = useState<number>(Number.isNaN(likesCount)?0:likesCount);
    
    //@ts-ignore
    let liked = likedIds?.includes(session?.user?.id)
    console.log(session?.user?.id)
    const [isLiked,setIsLiked] = useState<boolean>(liked);

    const handleLike = async() => {

        setIsLiked(prev => !prev);
        if(isLiked) {setLikes(prev=>prev-1)}
        else setLikes(prev => prev+1);
        // @ts-ignore
        updatePostLikes(postId,session?.user?.id,liked,path);
    }
  return (
    <div className="flex items-center">
                <button onClick={handleLike}>
                  {isLiked? (
                    <BsFillHeartFill
                      style={{ color: "red", height: "25px", width: "25px" }}
                    />
                  ) : (
                    <BsHeart
                      style={{ height: "25px", width: "25px" }}
                      className="fill-[#E90064]"
                    />
                  )}
                </button>
                <span className="ml-2 text-white">{likes}</span>
              </div>
  )
}

export default LikeButton
