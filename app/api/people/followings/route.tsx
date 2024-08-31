import { getAllFollowings } from "@/actions/user.action";
import { NextRequest } from "next/server";


interface Props {
    userId:string
}
export const GET = async (request:NextRequest,params:Props) => {
    try {
        const url = new URL(request.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const userId = searchParams.get('userId') || ''
        const followings = await getAllFollowings(userId)

        console.log(followings)
        return new Response(JSON.stringify(followings),{status:200})
    } catch(error:any) {
        return new Response(null,{status:400,statusText:error.message})
    }
}