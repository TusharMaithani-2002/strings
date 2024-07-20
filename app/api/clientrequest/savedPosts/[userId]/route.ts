import { getSavedPosts } from "@/actions/user.action";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params:{
        userId:string
    }
}

export const GET = async(request:NextRequest,{params}:Props) => {
    try {
        const {userId} = params;
        if(!userId) return null;
        const posts = await getSavedPosts(userId);

        return new Response(JSON.stringify(posts),{status:200})
    } catch(error:any) {
        throw new Error('Error while fetching saved posts! message: '+error.message)
    }
}