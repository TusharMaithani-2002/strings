"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { signOut, useSession } from 'next-auth/react';
import { getUser } from "@/actions/user.action";
import Link from "next/link";
import { useAppContext } from "../context/context";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useAppContext();
  const {data:session} = useSession();

  return (
    <div className="relative">
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
       justify-between bg-white duration-300 ease-out
      "
        >

          <Link href={`/profile/${user._id}`}>
          <Image
            src={user?.profileImage || session?.user?.image as string}
            alt="profile-image"
            width={100}
            height={100}
            className="cursor-pointer rounded-md"
          />
          </Link>

        <div className="flex flex-col gap-3">
          <Link href={`/profile/${user._id}`} className="text-gray-500">{user?.name || session?.user?.name}</Link>

          <Link href={`/profile/${user._id}`} className="text-sm text-gray-500">{user?.email || session?.user?.email}</Link>

 
            <Button className="bg-orange-500 rounded-lg p-2 text-lg text-white w-full
            hover:bg-orange-400
            "
            clickAction={()=>signOut({
                redirect:true,
                callbackUrl:'/'
            })}
            >
              Sign out
            </Button>
            <Button
              className="bg-white text-orange-500 border border-orange-500 w-full p-2 text-lg rounded-lg
              hover:bg-orange-300 hover:text-white
              "
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
