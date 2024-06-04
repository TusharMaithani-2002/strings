"use client";
import { getUser } from '@/actions/user.action';
import AccountProfile from '@/app/components/Form/AccountProfile';
import { useAppContext } from '@/app/context/context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const Page = () => {

  const {data:session,status} = useSession();
  const router = useRouter();
  // @ts-ignore
  const {user} = useAppContext();
  console.log(session,status)


  if(status === 'loading') return <div>Loading...</div>

  if(!session) router.push('/')
  if(user?.onBoarded) {
    router.push('/home');
  }
  
  return (
    <div>
        {user && <AccountProfile user={user} title={"Onboarding"}/>}
    </div>
  )
}
export default Page
