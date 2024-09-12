"use server"

import Activity from "@/app/models/activity";
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
export const addPost = async (post: PostProps, path?: string) => {
    try {
      await connectToDB();
        
      console.log('creating post',post)
      const newPost = await Post.create(post);
      console.log('new post created',newPost)
      // Handle mentions asynchronously using Promise.all
      if (post.mentions && post.mentions.length > 0) {
        console.log('handling new post')
        await Promise.all(
          post.mentions.map(async (userId: string) => {
            const user = await User.findById(userId, {
              "mentions": 1,
              "activities": 1,
              "unseenCount": 1,
            });
  
            if (!user) throw new Error(`User with ID ${userId} not found`);
  
            const activity = await Activity.create({
              performer: post.author,
              receiver: user._id,
              activity: 'mentioned',
              post: newPost._id,
            });
  
            user.unseenCount += 1;
            user.mentions.push(newPost._id);
            user.activities.push(activity);
  
            await user.save();
            console.log('user updated and saved',user._id)
          })
        );
      }
  
      // Handle parent post updates
      if (post.parent) {
        console.log('handling parent post')
        const parentPost = await Post.findById(post.parent);
        parentPost.repliesCount += 1;
  
        // Create activity for commenting on the parent post
        const activity = await Activity.create({
          performer: post.author,
          receiver: parentPost.author,
          activity: 'commented',
          post: post.parent,
        });

        console.log('created parent post activity', activity)
  
        const author = await User.findById(parentPost.author, {
          unseenCount: 1,
          activities: 1,
        });
  
        author.unseenCount += 1;
        author.activities.push(activity);
  
        await Promise.all([author.save(), parentPost.save()]);
        console.log('parent post and author updated and saved')
      }
  
      // Ensure revalidation is only called when necessary
      if (path) revalidatePath(path);
    console.log(path)
      console.log('post creating successful', newPost)
  
      return newPost;
    } catch (error: any) {
      throw new Error('Error while creating post! message: ' + error.message);
    }
  };
  

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


export const updatePostLikes = async(postId:string,userId:string,liked:boolean,path:string="") => {
    try {

        const post = await Post.findById(postId,{
            "likesCount":1,
            "likedIds":1,
            "author":1
        });
        const user = await User.findById(userId,{
            "likedPosts":1
        });

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

            //liking: adding an activity
            const activity = await Activity.create({
                performer:user._id,
                receiver:post.author,
                activity:'liked',
                post:postId
            })

            //adding activity in post's author
            const author = await User.findById(post.author,{
                "activities":1,
                "unseenCount":1
            })

            author.activities.push(activity)
            author.unseenCount = author.unseenCount + 1
            await author.save()
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