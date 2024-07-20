
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "../components/ProfileHeader";

import MentionPosts from "../components/MentionPosts";
import GeneralPostsClient from "../components/GeneralPostsClient";
import SavedPost from "../components/SavedPost";
import { useAppContext } from "@/app/context/context";
import { Suspense } from "react";
import ProfileTabs from "../components/ProfileTabs";
import GeneralPosts from "@/app/components/GeneralPosts";

const Page = ({ params }: { params: { profileId: string } }) => {
  const { profileId } = params;
  if (!profileId) redirect("/home");


  return (
    <div
      className="w-full flex flex-col items-center md:min-h-[calc(100vh-80px)] md:max-h-[calc(100vh-80px)] 
    overflow-auto"
    >
      <ProfileHeader profileId={profileId} />

      <Tabs
        className="w-full md:w-2/3 flex flex-col items-center"
        defaultValue="posts"
      >
      <ProfileTabs profileId={profileId} />
        <div className="w-full">
          <TabsContent value="posts" className="w-full">
            <Suspense fallback={<div className="text-white">loading</div>}>
              <GeneralPosts userId={profileId} />
            </Suspense>
          </TabsContent>
          <TabsContent value="mentions">
            <MentionPosts userId={profileId} />
          </TabsContent>
          <TabsContent value="saved">
            <SavedPost userId={profileId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;
