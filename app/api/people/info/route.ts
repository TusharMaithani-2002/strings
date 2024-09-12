import { getUserName } from "@/actions/user.action";
import { NextRequest } from "next/server";

interface Props {
    params : {}
}

export const GET = async (request:Request,params:Props) => {
    
    try {

        const url = new URL(request.url)
        const searchParams = new URLSearchParams(url.searchParams)
        const userId = searchParams.get('userId')
        if(!userId) throw new Error('userId not found!')
        const username = await getUserName(userId)
        return new Response(JSON.stringify(username),{status:200})
    } catch(error:any) {
        throw new Error('error while fetching user details '+error.message)
    }
}