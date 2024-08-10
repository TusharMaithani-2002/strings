import { getAllFollowers } from "@/actions/user.action"
import { NextRequest } from "next/server"


interface Props {
    params: {
        userId:string
    }
}
export const GET = async(request:any,{params}:Props) => {
    try {
        const url = new URL(request.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const userId = searchParams.get('userId') || ''
        const followers = await getAllFollowers(userId)

        return new Response(JSON.stringify(followers),{status:200})
    }
    catch(error:any) {
        return new Response(null,{status:400,statusText:error.message})
    }
}