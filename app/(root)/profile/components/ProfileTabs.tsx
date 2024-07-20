"use client";
import { useAppContext } from '@/app/context/context';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react'

const ProfileTabs = ({profileId}:{profileId:string}) => {

      // @ts-ignore
  const { user } = useAppContext();
  return (
    <TabsList
          defaultValue="posts"
          className="flex w-2/3 justify-around gap-2 mb-10 bg-[rgba(16,16,16,1)]"
        >
          <TabsTrigger value="posts" className="px-16 ">
            Posts
          </TabsTrigger>
          <TabsTrigger value="mentions" className="px-10">
            Mentions
          </TabsTrigger>
          {user?._id === profileId && (
            <TabsTrigger value="saved" className="px-16 ">
              Saved
            </TabsTrigger>
          )}
        </TabsList>
  )
}

export default ProfileTabs
