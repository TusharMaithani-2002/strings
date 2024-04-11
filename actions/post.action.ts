"use server"

import Post from "@/app/models/post";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/database";
import { revalidatePath } from "next/cache";


interface PostProps {
    content: string;
    images?: any[]; 
    mentions?: string[]; 
    tags?: string[];
    group?: string;
    author: string;
    parent?:string;
}
export const addPost = async (post:PostProps) => {
    try {
        await connectToDB();
        const newPost = await Post.create(post);
        revalidatePath("/create")
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
        const posts = await Post.find({parent:null},{
            "images":1,
            "author":1,
            "likesCount":1,
            "repliesCount":1,
            "tags":1,
            "content":1,
            "group":1,
            "likedIds":1,
            "createdAt":1
        }).populate({path:'author',select:'_id username profileImage'}).sort({createdAt:"desc"});
        return posts;
    } catch(error:any) {
        throw new Error("Error while fetching posts! message: "+error.message)
    }
}


export const updatePostLikes = async(postId:string,userId:string,liked:number,path:string="") => {
    try {

        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if(!post) throw new Error('post not found!');

        if(liked !== -1) {
            // post liked, removing post
            post?.likedIds.splice(liked,1);
            post.likedCount = post.likesCount - 1;
            const filteredLikedPosts = user?.likedPosts.filter((post:string) => post !== postId)
            user.likedPost = filteredLikedPosts;
            

        } else {
            post?.likedIds.push(userId);
            post.likesCount = post.likesCount + 1;
            user?.likedPosts.push(postId);
        }

        await post.save();
        await user.save();
        revalidatePath(path)
    } catch(error:any) {
        throw new Error('Error while updating likes! message: '+error.message);
    }
}

export const getPost = async (postId:string) => {

    try {

        if(!postId) return null;
        await connectToDB();

        const post = await Post.findById(postId).populate({path:'author',select:'_id username profileImage'})
        return post;
    } catch(error:any) {
        throw new Error('error while fetching post! message: '+error.message);
    }
}

