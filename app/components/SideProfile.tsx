"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppContext } from "../context/context";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Button from "./ui/Button";
import Link from "next/link";

const SideProfile = () => {

    // @ts-ignore
    const {user} = useAppContext();
    const {data:session} = useSession();

    return <Popover>
        <PopoverTrigger>
        <Image
        src={user?.profileImage || session?.user?.image as string}
        alt="profile-image"
        width={40}
        height={40}
        className="rounded-full cursor-pointer object-fill"
      />
        </PopoverTrigger>

        <PopoverContent className="modal w-[250px] rounded-md
      flex flex-col gap-3 p-3 text-center items-center
       justify-between bg-white m-4">


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
        </div>
    
        </PopoverContent>
    </Popover>
}

export default SideProfile;