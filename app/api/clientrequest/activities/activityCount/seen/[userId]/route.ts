
import { setseenCount } from "@/actions/user.action"
import { NextRequest } from "next/server"

interface Props {
    params: {
        userId:string
    }
}
export const PATCH = async(request:NextRequest,{params}:Props) => {
    try {

        const {userId} = params

        const unseenCount = await setseenCount(userId)
        return new Response(JSON.stringify(unseenCount),{status:200})

    } catch(error:any) {
        throw new Error('error while fetching activities '+error.message)
    }
} 