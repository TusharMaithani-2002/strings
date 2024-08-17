"use server";

import Post from "@/app/models/post";
import User from "@/app/models/user";
import { connectToDB } from "@/app/utils/database";
import { revalidatePath } from "next/cache";
import { getAllPost } from "./post.action";

// interfaces
interface ProfileProps {
  name?: string;
  bio?: string;
  coverImage?: string;
  profileImage?: string;
  id: string;
  onBoarded?: Boolean;
}
interface Author {
  name:string;
  username:string;
  profileImage:string;
  _id:string;
}

export const getUser = async (id: string) => {
  if (!id || id.length == 0) return;
  try {
    await connectToDB();
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if (!user) throw new Error("User not found!");

    // return new Response(JSON.stringify(user),{status:200,statusText:'found user successfully!'});
    return user;
  } catch (error: any) {
    throw new Error("Failed to fetch user! message: " + error.message);
  }
};

export const updateUserProfile = async (profile: ProfileProps) => {
  try {
    await connectToDB();
    const { name, bio, profileImage, coverImage, id, onBoarded } = profile;
    console.log(id);
    const user = await User.findById(id);

    if (!user) throw new Error("User not found! mesage");

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (coverImage) user.coverImage = coverImage;
    if (profileImage) user.profileImage = profileImage;
    if (onBoarded) user.onBoarded = true;
    user.noOfFollowers = 0
    user.noOfFollowings = 0

    user.save();

    return true;
  } catch (error: any) {
    throw new Error("Error while updating user! message: " + error.message);
  }
};

export const getUserName = async (id: string) => {
  try {
    await connectToDB();
    const user = await getUser(id);
    if (!user) throw new Error("User not found!");
    return user.username;
  } catch (error: any) {
    throw new Error("Error while getting user name! message: " + error.message);
  }
};

export const savePostToUserAccount = async (
  postId: string,
  userId: string,
  path: string = ""
) => {
  try {
    await connectToDB();
    const user = await getUser(userId);

    if (!user) throw Error("User not found!");

    const savedPostIndex = user?.savedPosts.indexOf(postId);
    if (savedPostIndex === -1) {
      user?.savedPosts.push(postId);
    } else {
      user?.savedPosts.pop(savedPostIndex);
    }
    await user.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Error while saving post! message: " + error.message);
  }
};

export const getSavedPosts = async (userId: string) => {
  console.log("getting saved posts");
  try {
    const user = await User.findById(userId, {
      savedPosts: 1,
    }).populate({
      path: "savedPosts",
      populate: {
        path: "author",
        select: "_id name username profileImage",
      },
    });

    return user.savedPosts as [];
  } catch (error: any) {
    throw new Error(
      "Error while fetching saved posts! message: " + error.message
    );
  }
};

export const getAllFollowers = async (userId: string) => {
  try {
    console.log('fetching all followers')
    connectToDB();
    const user = await User.findById(userId, {
      followers: 1,
    }).populate({
      path:'followers',
      select: "_id username name profileImage",
      options: { strictPopulate: false },
    });

    console.log(user)
    if (!user) throw new Error("User not found!");

    return user.followers as Author[];
  } catch (error: any) {
    throw new Error("Error finding followers! message: " + error.message);
  }
};
export const getAllFollowings = async (userId: string) => {
  try {
    connectToDB();
    const user = await User.findById(userId, {
      followings: 1,
    }).populate({
      path:'followings',
      select: "_id username name profileImage",
      options: { strictPopulate: false },
    });;

    if (!user) throw new Error("User not found!");

    return user.followings as Author[];
  } catch (error: any) {
    throw new Error("Error finding followings! message: " + error.message);
  }
};

/** 
@params
userId person to be followed,
followerId: current session user requesting to follow
*/
export const addFollower = async (userId: string, followerId: string,path?:string) => {
  // userId: person to be followed
  // followerId: current session user requesting to follow

  try {
    const user = await getUser(userId);
    const follower = await getUser(followerId);

    if (!user || !follower) throw new Error("User or follower not found!");

    const userFollowIndex = user?.followers.indexOf(followerId);

    if (userFollowIndex === -1) {
      user.followers.push(followerId);
      follower.followings.push(userId);
      user.noOfFollowers = user.noOfFollowers + 1;
      follower.noOfFollowings = follower.noOfFollowings + 1;
    } else {
      user.followers.pop(userFollowIndex);
      const followingUserIndex = follower.followings.indexOf(userId);
      follower.followings.pop(followingUserIndex);
      user.noOfFollowers = user.noOfFollowers - 1;
      follower.noOfFollowings = follower.noOfFollowings - 1;
    }

    await user.save();
    await follower.save();

    revalidatePath(path as string);
    return true;
  } catch (error: any) {
    throw new Error("Error while adding follower! message: " + error.message);
  }
};

export const getAllMentionedPosts = async (userId: string) => {
  try {
    await connectToDB();
    const user = await User.findById(userId, {
      mentions: 1,
    }).populate({
        path: "mentions",
        populate:{
          path: "author",
          select: "_id username name profileImage",
          ptions: { strictPopulate: false },
        }
      })

    return user?.mentions
  } catch (error: any) {
    throw new Error(
      "Error while getting all mentioned posts! message: " + error.message
    );
  }
};

export const getProfileInfo = async (userId:string) => {
  try {
    if(!userId) throw new Error('User Id not found!')
    await connectToDB()
    
    const userInfo = await getUser(userId);

    const posts = await getAllPost(userId);

    return {
      ...userInfo._doc,
      noOfPosts:posts.length
    }
  } catch(error:any) {
    throw new Error('Error while fetching user profile info! message: '+error.message)
  }
}