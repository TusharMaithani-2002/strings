import { getUserActivities } from "@/actions/user.action";
import { NextRequest } from "next/server";

interface Props {
    params: {
        userId:string
    }
}
export const GET = async(request:NextRequest,{params}:Props) => {
    try {

        const {userId} = params

        const activities = await getUserActivities(userId)
        return new Response(JSON.stringify(activities),{status:200})

    } catch(error:any) {
        throw new Error('error while fetching activities '+error.message)
    }
} 