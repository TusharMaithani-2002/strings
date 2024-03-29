"use client";
import React from 'react'
import { useSession } from 'next-auth/react';
import { useAppContext } from '@/app/context/context';
import { useRouter } from 'next/navigation';

const Page =  () => {

  const {data:session,status} = useSession();
  const router = useRouter()

  if(status === "unauthenticated") router.push('/')
  console.log(session)

  const {user} = useAppContext();
  return (
    <div className='overflow-auto max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-80px)]'>
      home
      {
        session && (
          <div>
        <p>we are logged in.. do you want to log out?</p>
        <p>User : {user?.username}</p>

      
        </div>
        )
      }
    </div>
  )
}

export default Page
