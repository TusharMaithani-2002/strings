"use server";

import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/database";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

// interfaces
interface ProfileProps {
    name?:string;
    bio?:string;
    coverImage?:string;
    profileImage?:string;
    id:string;
    onBoarded?:Boolean
}


export const getUser = async (id:string) => {

    if(!id || id.length ==0) return;
    try{
        await connectToDB();
        console.log(id);
        const user = await User.findById(id);
        console.log(user);
        if(!user) throw new Error('User not found!');

        // return new Response(JSON.stringify(user),{status:200,statusText:'found user successfully!'});
        return user;
    } catch(error:any) {
        throw new Error("Failed to fetch user! message: "+error.message)
    }
}

export const updateUserProfile = async(profile:ProfileProps) => {

    try {
        await connectToDB();
        const {name,bio,profileImage,coverImage,id,onBoarded} = profile;
        console.log(id)
        const user = await User.findById(id);

        if(!user) throw new Error('User not found! mesage')
        
        if(name) user.name = name;
        if(bio) user.bio = bio;
        if(coverImage) user.coverImage = coverImage;
        if(profileImage) user.profileImage = profileImage;
        if(onBoarded) user.onBoarded = true;

        user.save();

        return true;

    } catch(error:any) {
        throw new Error('Error while updating user! message: '+error.message);
    }
}

export const getUserName = async (id : string) => {
    try {
        await connectToDB();
        const user = await getUser(id)
        if(!user)throw new Error ('User not found!')
        return user.username
    } catch (error:any) {
        throw new Error ('Error while getting user name! message: '+error.message)
    }
}

// export const currentUser = async () => {

//     const session = await getServerSession();
//     console.log(session);
// }