"use client";
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import Button from '../ui/Button';
import { IoMdSend } from "react-icons/io";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css";
import { addPost } from '@/actions/post.action';
import { useAppContext } from '@/app/context/context';

interface Props {
  parentId:string;
}

const Comment = ({parentId}:Props) => {
    const pathname = usePathname();
    const [content,setContent] = useState('');
    const {user} = useAppContext();

    const handleComment = async() => {

      const comment = await addPost({
        content,
        author:user._id,
        parent:parentId
      },`/post/${parentId}`)
 
      if(comment) setContent('');
    }
  return (
    <form className='p-1 w-full flex items-center justify-around gap-2 rounded-xl mt-3 mb-3'>
      {/* <textarea className='w-5/6 rounded-xl p-2 'rows={1} placeholder='reply to post'/> */}
      <ReactQuill theme="bubble" className='w-full bg-[rgba(16,16,16,1)]  text-white rounded-lg border-2
      text-lg fill-white
      border-gray-500'
      value={content}
      onChange={setContent}
      />
      <Button className='bg-[#E90064]  rounded-full p-3'
      clickAction={()=>handleComment()}
      type="button"
      ><IoMdSend className='fill-white h-[20px] w-[20px]'/></Button>
    </form>
  )
}

export default Comment
