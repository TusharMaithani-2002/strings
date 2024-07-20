import { getAllPost } from "@/actions/post.action";
import { NextRequest } from "next/server";

interface Props {
    params:{
        userId:string
    }
}

export const GET = async (request:NextRequest,{params}:Props) => {
    try{

        const {userId} = params;
        console.log('inside get')
        if(!userId) return null;
        const posts = await getAllPost(userId);

        return new Response(JSON.stringify(posts),{status:200})
    } catch(error:any) {
        throw new Error('Failed fetching all mentioned posts! message: '+error.message);
    }
}