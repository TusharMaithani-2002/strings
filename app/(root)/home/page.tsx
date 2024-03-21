"use client";
import React from 'react'
import { useSession } from 'next-auth/react';

const Page =  () => {

  const {data:session} = useSession();
  console.log(session)
  return (
    <div>
      home
      {
        session && <p>we are logged in.. do you want to log out?</p>
      }
    </div>
  )
}

export default Page
