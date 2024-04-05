"use server"

import Post from "@/app/models/post";
import { connectToDB } from "@/app/utils/database";
import { Schema } from "mongoose";

interface PostProps {
    content: string;
    images: string[]; 
    mentions?: Schema.Types.ObjectId[]; 
    tags?: string[];
    group?: Schema.Types.ObjectId | null;
    author: Schema.Types.ObjectId;
}
export const addPost = async (post:PostProps) => {
    try {
        console.log("1")
        await connectToDB();
        console.log("2")
        const newPost = await Post.create(post);
        console.log("post added");
        return newPost;
    } catch(error:any) {
        throw new Error("Error while creating post! message: "+error.message)
    }
}