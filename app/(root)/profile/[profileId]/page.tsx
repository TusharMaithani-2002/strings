import { getUser } from "@/actions/user.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralPosts from "@/app/components/GeneralPosts";

const Page = async ({ params }: { params: { profileId: string } }) => {
  if (!params.profileId) redirect("/home");
  const user = await getUser(params.profileId);

  return (
    <div className="w-full flex flex-col items-center md:min-h-[calc(100vh-80px)] md:max-h-[calc(100vh-80px)] 
    bg-purple-900
    overflow-auto">
     
      <div className="flex flex-col w-2/3 items-center mb-10 bg-purple-500">
      <div className="flex justify-around w-2/3">
        <div className="p-5">
          <Image
            src={user.profileImage}
            alt="profile-image"
            width={60}
            height={60}
            className="rounded-full object-fill"
          />
        </div>
        <div className="flex flex-col justify-center text-gray-300 p-5">
          <div>@{user.username}</div>
          <div>{user.name}</div>
        </div>
      </div>
      <div className="text-white text-center">{user.bio}</div>
      </div>

        <Tabs className="w-full md:w-2/3" defaultValue="posts">
          <TabsList defaultValue="posts" className="flex w-full justify-around gap-2 mb-10">
            
            <TabsTrigger value="posts" className="px-16 hover:bg-green-500 hover:text-white focus:bg-green-500">Posts</TabsTrigger>
            <TabsTrigger value="comments" className="px-16 hover:bg-green-500 hover:text-white">Comments</TabsTrigger>
            <TabsTrigger value="saved" className="px-16 hover:bg-green-500 hover:text-white">Saved</TabsTrigger>
            
          </TabsList>

            <div className="">
            <TabsContent value="posts" className="w-full"><GeneralPosts userId={params.profileId}/></TabsContent>
            <TabsContent value="comments"><GeneralPosts userId={params.profileId} postType="comments"/></TabsContent>
            <TabsContent value="saved">saved</TabsContent>
            </div>

        </Tabs>

    </div>
  );
};

export default Page;
