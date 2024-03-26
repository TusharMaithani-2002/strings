"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { signOut, useSession } from 'next-auth/react';
import { getUser } from "@/actions/user.action";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user,setUser] = useState({});
  const {data:session} = useSession();

  useEffect(() => {

    const fetchUser = async() => {
      setUser(await getUser(session?.user?.id))
    }

    fetchUser();
  },[session,session?.user]);
  
  return (
    <div className="relative h-full">
      {!isOpen && <Image
        src={user?.profileImage || session?.user?.image as string}
        alt="profile-image"
        width={40}
        height={40}
        className="rounded-full cursor-pointer object-fill"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />}

      {isOpen && (
        <div
          className="modal absolute top-0 right-0 w-[250px] rounded-md
      flex flex-col gap-3 p-3 text-center
      transition-all items-center
       justify-between bg-white
      "
        >

          <Image
            src={user?.profileImage || session?.user?.image as string}
            alt="profile-image"
            width={100}
            height={100}
            className="cursor-pointer rounded-md"
          />

        <div className="flex flex-col gap-3">
          <div className="text-gray-500">{user?.name || session?.user?.name}</div>

          <div className="text-sm text-gray-500">{user?.email || session?.user?.email}</div>

 
            <Button className="bg-orange-600 rounded-lg p-2 text-lg text-white w-full"
            clickAction={()=>signOut({
                redirect:true,
                callbackUrl:'/'
            })}
            >
              Sign out
            </Button>
            <Button
              className="bg-white text-purpe-500 border border-orange-500 w-full p-2 text-lg rounded-lg"
              clickAction={() => setIsOpen((prev) => !prev)}
            >
              cancel
            </Button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
