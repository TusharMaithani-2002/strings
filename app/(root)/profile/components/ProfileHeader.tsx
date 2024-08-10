import Image from "next/image";
import SocialStatus from "./SocialStatus";
import { getAllFollowers, getAllFollowings, getProfileInfo } from "@/actions/user.action";
import FollowButton from "./FollowButton";

interface Props {
  profileId: string;
}


const followers = [
  {
    _id:'669bc072260e837cd1a90aff',
    username: 'tusharmaithani',
    name: 'Tushar Maithani',
    profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocJgo7AiFI7EFOiWVktxtWAcd4CCH33VhtWwCCMkj6VLYWNXf_7h=s96-c'
  }
]
// const followings = [
//   {
//     _id:'669bc072260e837cd1a90aff',
//     username: 'tusharmaithani',
//     name: 'Tushar Maithani',
//     profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocJgo7AiFI7EFOiWVktxtWAcd4CCH33VhtWwCCMkj6VLYWNXf_7h=s96-c'
//   }
// ]
// const userInfo = []

// const followers = await getAllFollowers(profileId)
const ProfileHeader = async ({ profileId }: Props) => {
  console.log('rendering profile header')
  const userInfo = await getProfileInfo(profileId); 
  // let followers 
  const followings = await getAllFollowings(profileId)


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
          <SocialStatus user={userInfo} profileId={profileId} />
        </div>
      </div>

      <div className="text-white text-center text-lg">{userInfo?.bio}</div>
    </div>
  );
};

export default ProfileHeader;
