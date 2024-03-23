"use client";

import { updateUserProfile } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import { uploadImage } from "@/app/utils/uploadImage";


const AccountProfile = ({ user ,title}: any) => {

  const router = useRouter();
  const { data: session } = useSession();
  const [bio,setBio] = useState<string>(user?.bio || 'tell people about yourself');
  const [image,setImage] = useState(user?.profileImage || session?.user?.image);
  
  const {register,handleSubmit,formState:{errors},watch} = useForm({
    defaultValues:{
        profileImage:user?.profileImage || session?.user?.image,
        name:user?.name,
        username:user?.username,
        bio:user?.bio,
    }
  });

  const handleImage = async(e:ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onloadend = async() => {
      const newImage = await uploadImage(reader.result)
      setImage(newImage);
    }
    reader.readAsDataURL(e.target.files[0])
  }

  

  const onSubmit = async (data:any) => {
    let modifiedBio = bio;
    if(modifiedBio[0] === '<') modifiedBio = modifiedBio.substring(3);
    if(modifiedBio[modifiedBio.length-1] === '>') modifiedBio = modifiedBio.substring(0,modifiedBio.length-4);
    const output = {...data,bio:modifiedBio,id:session?.user?.id,profileImage:image,onBoarded:true}

    // if(image !== session?.user?.image) {
    //   const newImageUrl = await uploadImage(image);
    //   data.profileImage = newImageUrl.toString();
    // }
    const response = await updateUserProfile(output);
    
    if(response) title === 'Onboarding' && router.push('/home');
  }
  return (
    <form className="flex flex-col items-center h-screen" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-3xl font-bold text-green-500 text-center mt-5">{title}</div>

        <div className="w-3/5 mt-5">

       
        <div className="flex flex-col md:flex-row items-center justify-around  bg-green-200 p-5 rounded-xl">
            <div className="relative">
                <Image width={100} height={100} alt={'profile'} 
            src={image as string}
            className="rounded-full"
            />
            <label htmlFor="file-input" className="absolute rounded-full bottom-0 right-0"><FaCamera height={20} width={20} fill="green"/></label>
            <input type="file" id="file-input" className="hidden" onChange={(e)=>handleImage(e)}/>
            </div>


            <div className="flex flex-col gap-2 items-center justify-center">
                
                    <input 
                    className="mt-5 md:mt-0 w-4/5 outline-none py-2 focus:border-green-600 focus:border-b-2
                    text-center focus:placeholder:text-green-500
                    focus:text-green-600 bg-transparent md:text-xl font-semibold
                    "
                    type="text" value={user?.name} placeholder="enter your name"
                    {...register('name')}
                    />
                
                <div className="text-gray-500 text-center">
                    @{user?.username}
                </div>
            </div>
        </div>

        <div className="mt-10">
            <label className="font-semibold text-lg">Bio</label>
            <div className="bg-blue-200 text-lg">
            <ReactQuill theme="bubble" value={bio} onChange={setBio} />
            </div>
        </div>
        </div>

        <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-[150px] mt-10">submit</button>
    </form>
  )
};

export default AccountProfile;
