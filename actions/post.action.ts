"use server"

import Post from "@/app/models/post";
import { connectToDB } from "@/app/utils/database";
import { Schema } from "mongoose";
import { revalidatePath } from "next/cache";

interface PostProps {
    content: string;
    images?: any[]; 
    mentions?: string[]; 
    tags?: string[];
    group?: string;
    author: string;
}
export const addPost = async (post:PostProps) => {
    try {
        console.log(post)
        await connectToDB();
        const newPost = await Post.create(post);
        revalidatePath('/create')
        return {
            success:true,
        };
    } catch(error:any) {
        throw new Error("Error while creating post! message: "+error.message)
    }
}

export const getAllPost = async () => {
    try {
        await connectToDB();
        const posts = await Post.find();
        return posts;
    } catch(error:any) {
        throw new Error("Error while fetching posts! message: "+error.message)
    }
}