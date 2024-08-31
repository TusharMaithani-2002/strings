'use client'


import LoadingModal from "@/app/components/LoadingModal";
import { useAppContext } from "@/app/context/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

interface ActivityInfo {
    activity:string;
    performer:{
        _id:string;
        username:string;
    }
    receiver:string;
    post:string;
}

const ActivityNofitication = ({activityInfo}:{activityInfo:ActivityInfo}) => {

    const {activity,performer,post} = activityInfo
    const router = useRouter()


    let linkHref='';
    let message=''

    switch(activity) {
        case "liked":
            linkHref = `/post/${post}`
            message = ' liked your post.'
            break
        case "commented":
            linkHref = `/post/${post}`
            message = ' commented on your post.'
            break
        case "mentioned":
            linkHref = `/post/${post}`
            message = ' mentioned on your post.'
            break
        case "followed":
            linkHref = `/profile/${performer._id}`
            message = ' followed you.'
            break
    }

    const handlePerformerClick = (e:any) => {
        e.stopPropagation()
        router.push(linkHref)
    }

    return <div className="">
        <span onClick={e=>handlePerformerClick(e)} className="font-semibold hover:text-[#E90064]">{performer.username}</span> {message}
    </div>
    
}

const Page = () => {

    const [activities,setActivities] = useState([])
    const [loading,setLoading] = useState(false)
    const {data:session} = useSession()
    const router = useRouter()
    
    //@ts-ignore
    const {setActivityCount,activityCount} = useAppContext()
    //@ts-ignore
    const userId = session?.user?.id
    useEffect(() => {


        const fetchActivity = async () => {
            setLoading(true)
            const fetchedActivities = await axios.get(`api/clientrequest/activities/${userId}`)
            await axios.patch(`/api/clientrequest/activities/activityCount/seen/${userId}`)
            setActivities(fetchedActivities.data)
            console.log(fetchedActivities.data)
            setActivityCount(0)
            setLoading(false)
        }

        fetchActivity()
    },[userId,setActivityCount,activityCount])

    const handleActivityClick = (
        post:string
    ) => {
        router.push(`post/${post}`)
    }
    return (
        <div className="w-full flex flex-col overflow-y-auto h-full gap-2 py-8 px-2">
             {loading ? <LoadingModal show={loading}/> : 
            (
               Array.isArray(activities) && activities.map((activity:ActivityInfo,key) => (
                <div className="text-white w-full p-2 md:w-2/5 bg-black cursor-pointer rounded-sm" key={key}
                onClick={(e)=>handleActivityClick(activity.post)}
                >
                   <ActivityNofitication activityInfo={activity}/>
                </div>
               ))
            )}
        </div>
    )
}

export default Page;