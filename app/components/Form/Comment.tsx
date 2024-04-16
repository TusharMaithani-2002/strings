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
    <form className='bg-green-300 p-2 w-full flex items-center justify-around gap-2'>
      {/* <textarea className='w-5/6 rounded-xl p-2 'rows={1} placeholder='reply to post'/> */}
      <ReactQuill theme="bubble" className='w-full bg-white text-black rounded-lg'
      value={content}
      onChange={setContent}
      />
      <Button className='bg-green-700 rounded-full p-3'
      clickAction={()=>handleComment()}
      type="button"
      ><IoMdSend className='fill-white h-[20px] w-[20px]'/></Button>
    </form>
  )
}

export default Comment
