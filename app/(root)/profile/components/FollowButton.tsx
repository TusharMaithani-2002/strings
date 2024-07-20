'use client'
import { addFollower } from '@/actions/user.action'
import { useAppContext } from '@/app/context/context'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

interface Props {
    followerId:string,
}

const FollowButton = ({followerId}:Props) => {
    //@ts-ignore
    const {user} = useAppContext()
    
    const isFollowed = user?.followings.indexOf(followerId)
    const [followed,setFollowed] = useState(isFollowed !== -1)
    
    if(user?._id === followerId) return

    const handleClick = async () => {
        const response = await addFollower(followerId,user?._id,`/profile/${followerId}`)
        if(response) setFollowed(prev => !prev)
    }
  return (
    <Button onClick = {handleClick} 
    className='w-[100px]'
    >{ followed  ? 'unfollow' : 'follow'}</Button>
  )
}

export default FollowButton
