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
export const addPost = async (post:PostProps,path?:string) => {
    try {
        await connectToDB();

        const newPost = await Post.create(post);
        const saveMentionInUser = post.mentions?.map(async (userId)=> {
            const user = await User.findById(userId,{
                "mentions":1
            })

            user.mentions.push(newPost._id)

            return user.save()
        })

        if(saveMentionInUser) Promise.all(saveMentionInUser)
        if(post.parent) {
            const parentPost = await Post.findById(post.parent);
            parentPost.repliesCount = parentPost.repliesCount + 1;
            await parentPost.save();
        }

        revalidatePath(path as string);
        return newPost;
    } catch(error:any) {
        throw new Error("Error while creating post! message: "+error.message)
    }
}

export const getAllPost = async (userId?:string,postType?:string) => {
    try {

        const query: {author?:string,parent?:{}|null} = {};

        if(userId) {
            query.author = userId
        }

        if(postType === 'comments') {
            query.parent = { $ne: null } 
        } else query.parent = null;

        await connectToDB();
        const posts = await Post.find(query,{
            "images":1,
            "author":1,
            "likesCount":1,
            "repliesCount":1,
            "tags":1,
            "content":1,
            "group":1,
            "likedIds":1,
            "createdAt":1,
            "parent":1
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

        if(liked) {
            // post liked, removing post
            post?.likedIds.splice(liked,1);
            post.likesCount = post.likesCount - 1;
            const filteredLikedPosts = user?.likedPosts.filter((post:string) => post !== postId)
            user.likedPosts = filteredLikedPosts;
            

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

export const getPostComments = async (postId:string) => {
    try {

    if(!postId) return [];
    await connectToDB();

    const comments = await Post.find({parent:postId}).populate({path:'author',select:'_id username profileImage'});
    return comments;

    } catch(error:any) {
        throw new Error('Error while fetching comments! message: '+error.message);
    }
}

export const fetchAllChildStrings = async (postId:string) => {
    try {
        const childrenPosts = await Post.find({parent:postId})
        const descendantStrings:any[] = []

        for(const child of childrenPosts) {
            const descendants:any[] = await fetchAllChildStrings(child._id);
            descendantStrings.push(child._id,...descendants)
        }

        return descendantStrings;
    } catch(err:any) {
        throw new Error('Error while fetching parent strings message: '+err.message)
    }
}


export const deletePost = async (postId:string,path:string) => {
    try {
        connectToDB();

        // finding the main post
        const mainPost = await Post.findById(postId);

        if(!mainPost) {
            throw new Error('Post not found! message');
        }

        // finding all the children posts for the post
        const descendantPosts = await fetchAllChildStrings(postId);

        descendantPosts.push(postId);

        // TODO: implement a functionality to delete post from group also

        // deleting post
        await Post.deleteMany({
            _id: {$in:descendantPosts}
        })

        // reducing the replies count from parent
        const parent = await Post.findById(mainPost.parent);
        // if you get parent reduce like count
        if(parent) {
            parent.repliesCount = parent.repliesCount - 1;
            await parent.save();
        }

        revalidatePath(path);
    } catch(err:any) {
        throw new Error('Error while deleting post message: '+err.message)
    }
} 