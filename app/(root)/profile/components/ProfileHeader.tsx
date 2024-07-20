import Image from "next/image";
import SocialStatus from "./SocialStatus";
import { getProfileInfo } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import FollowButton from "./FollowButton";

interface Props {
  profileId: string;
}

interface CurrentUser {
  username: string;
  name: string;
  profileImage: string;
  bio: string;
}

const ProfileHeader = async ({ profileId }: Props) => {
  const userInfo = await getProfileInfo(profileId);
  return (
    <div className="flex flex-col w-2/3 items-center mb-10 ">
      <div className="flex justify-center items-center w-full">
        <div className="p-5">
          <Image
            src={userInfo?.profileImage as string}
            alt="profile-image"
            width={150}
            height={150}
            className="rounded-full object-fill"
          />
        </div>

        <div className="w-1/2">
          <div className="flex  gap-3 justify-around text-white p-5 font-bold text-xl">
            <div className="flex flex-col">
              <div>@{userInfo?.username}</div>
              <div>{userInfo?.name}</div>
            </div>
            <FollowButton followerId={profileId}/>
          </div>
          <SocialStatus user={userInfo} />
        </div>
      </div>

      <div className="text-white text-center text-lg">{userInfo?.bio}</div>
    </div>
  );
};

export default ProfileHeader;
