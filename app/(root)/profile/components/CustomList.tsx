'use client'
import LoadingModal from '@/app/components/LoadingModal';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { fetchData } from 'next-auth/client/_utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Author {
    name:string;
    username:string;
    profileImage:string;
    _id:string;
}
interface Props {
    // getData: () => Promise<string[]>;
    actionType?:string;
    action?:()=>{};
    title?:string;
    dataUrl:string;
    profileId:string;
}
const CustomList = ({actionType,action,title,dataUrl,profileId}:Props) => {

  const [data,setData] = useState<Author[]>([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
   
    const fetchData = async() => {
      const response = await axios.get(dataUrl,{
       params: {
        userId:profileId
       }
      })

      if(response.data?.length > 0)
      setData(response.data)
    setLoading(false)
    }

    try {
      setLoading(true)
      fetchData()
    } catch(error:any) {
      setLoading(false)
      console.error(error.message)
    }
  },[dataUrl,profileId])


  return loading ? <LoadingModal show={loading}/> : (
    <div className='bg-[#010102] p-2 rounded-sm w-[400px]'>
      
        <div className='text-white text-xl font-bold w-full text-center'>{title}</div>

        <input type="text" className='outline-none rounded-lg p-2 w-full mb-2'
        placeholder={`search ${title?.toLowerCase()}`}
        />

        <div className='overflow-y-auto max-h-[450px] custom-scrollbar::-webkit-scrollbar-thumb'>
      {
        data?.map((user,index) => (
            <div key={index} className='flex justify-evenly p-1 items-center'>
                <div className='w-[40px] h-[40px] rouned-full'><Image src={user.profileImage} alt='profile'
                className='rounded-full'
                width={40}
                height={40}
                /></div>

                <div className='text-white'>{user.username}</div>
                <Button onClick={action}
                className=''
                >
                    {actionType}
                </Button>
            </div>
        ))
      }
        </div>
    </div>
  )

  // return <div>This is component</div>
}

export default CustomList
