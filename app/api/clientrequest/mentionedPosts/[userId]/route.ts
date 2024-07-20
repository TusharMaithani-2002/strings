import { getAllMentionedPosts } from "@/actions/user.action";
import { NextRequest } from "next/server";

interface Props {
    params:{
        userId:string
    }
}

export const GET = async (request:NextRequest,{params}:Props) => {
    try{

        const {userId} = params;

        if(!userId) return null;
        const posts = await getAllMentionedPosts(userId);

        return new Response(JSON.stringify(posts),{status:200})
    } catch(error:any) {
        throw new Error('Failed fetching all mentioned posts! message: '+error.message);
    }
}