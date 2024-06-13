import { getUser } from "@/actions/user.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralPosts from "@/app/components/GeneralPosts";
import SavedPost from "@/app/components/SavedPost";
import ProfileHeader from "../components/ProfileHeader";

const Page = async ({ params }: { params: { profileId: string } }) => {

  const {profileId} = params;
  if (!profileId) redirect("/home");
  const user = await getUser(profileId);

  return (
    <div className="w-full flex flex-col items-center md:min-h-[calc(100vh-80px)] md:max-h-[calc(100vh-80px)] 
    overflow-auto">
     
      <ProfileHeader user={user}/>

        <Tabs className="w-full md:w-2/3 flex flex-col items-center" defaultValue="posts">
          <TabsList defaultValue="posts" className="flex w-2/3 justify-around gap-2 mb-10 bg-[rgba(16,16,16,1)]">
            
            <TabsTrigger value="posts" className="px-16 ">Posts</TabsTrigger>
            <TabsTrigger value="comments" className="px-10">Comments</TabsTrigger>
            <TabsTrigger value="saved" className="px-16 ">Saved</TabsTrigger>
            
          </TabsList>

            <div className="w-full">
            <TabsContent value="posts" className="w-full"><GeneralPosts userId={profileId}/></TabsContent>
            <TabsContent value="comments"><GeneralPosts userId={profileId} postType="comments"/></TabsContent>
            <TabsContent value="saved"><SavedPost userId={profileId} /></TabsContent>
            </div>

        </Tabs>

    </div>
  );
};

export default Page;
