"use client";
import { getUser } from '@/actions/user.action';
import AccountProfile from '@/app/components/Form/AccountProfile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const Page = () => {

  const {data:session,status} = useSession();
  const router = useRouter();
  const [user,setUser] = useState();
  console.log(session,status)

  useEffect(()=>{
    const fetchUser = async() => {
      const user = await getUser(session?.user?.id);
      setUser(user);
    }
    fetchUser();
  },[session?.user?.id])
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
