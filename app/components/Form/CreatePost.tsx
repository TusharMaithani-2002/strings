"use client";
import { uploadImage } from '@/app/utils/uploadImage';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageViewer from '../ImageViewer';
import Loading from '../Loading';

const CreatePost = () => {

    const [content,setContent] = useState('');
    const [images,setImages] = useState<any>([]);
    const [selection,setSelection] = useState(false);
    const [imageCount,setImageCount] = useState(0);

    const handleSubmit = () => {
        console.log(content)
        console.log(images)
    }
    const convertFileToDataUrl = async(file:any) => {
        return new Promise((resolve,reject) => {
          const reader = new FileReader();
          console.log('loading')
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        //   reader.readAsArrayBuffer(file)
        })
      }

    const hanldeFileChange = async(e:ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files);
        setImageCount(files.length);


        setSelection(true)

        try {
            const convertedFiles = await Promise.all(
                files.map(async(file) => {
                    const dataUrl = await convertFileToDataUrl(file);
                    // console.log(dataUrl)
                    return dataUrl;
                })
            )
            convertedFiles.map(async(image) => {
                const uploadedUrl = await uploadImage(image);
                setImages((prev:any[]) => [...prev,uploadedUrl]) 
            })
        } catch(error) {
            console.log('error while converting image files');
            console.log(error);
        }
        setSelection(false)
    }

  return (

    <>
    {selection && (images.length < imageCount) && <Loading />}
    <form action={handleSubmit} className='flex flex-col items-center'>

        <ReactQuill theme="snow" value={content} onChange={setContent} className='w-2/3 m-2 mb-5' placeholder='enter your thoughts'/>
        <div>
            <label htmlFor="input-file">upload image</label>
            <input type="file"id="input-file" className="hidden" accept='image/*' multiple onChange={hanldeFileChange}/>
        </div>

        <div className='border-2 border-orange-500 flex justify-center w-full'>
            {images && <ImageViewer images={images}/>}
        </div>
        <button type="submit">submit</button>
    </form>
    </>
  )
}

export default CreatePost
