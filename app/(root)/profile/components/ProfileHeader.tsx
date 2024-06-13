import Image from 'next/image'
import React from 'react'
import SocialStatus from './SocialStatus'


interface Props {
    user:any
}
const ProfileHeader = ({user}:Props) => {
  return (
    <div className="flex flex-col w-2/3 items-center mb-10 bg-[#B3005E]">

    <div className='flex justify-center items-center w-full'>

    <div className="p-5">
        <Image
          src={user.profileImage}
          alt="profile-image"
          width={150}
          height={150}
          className="rounded-full object-fill"
        />


    </div>

    <div className='w-1/2'>
    <div className="flex flex-col gap-3 text-white p-5 font-bold text-xl">
        <div>@{user.username}</div>
        <div>{user.name}</div>
      </div>
    <SocialStatus user={user} />
    </div>
    </div>

    <div className="text-white text-center text-lg">{user.bio}</div>
    </div>
  )
}

export default ProfileHeader
