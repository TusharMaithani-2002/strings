
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomList from "./CustomList";


interface Props {
  user: any;
  profileId: string;
}

interface Author {
  name:string;
  username:string;
  profileImage:string;
  _id:string;
}

const SocialStatus = ({ user, profileId}: Props) => {

  console.log('rendering social status')
  console.log(profileId)


  return (
    <div className="flex flex-row w-full justify-around text-xl">
      <div className="text-white">{user?.noOfPosts} posts</div>
      <Popover>
        <PopoverTrigger>
          <div className="text-white cursor-pointer">
            {user?.noOfFollowers} Followers
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-none">
          {/* <CustomList getData={async () => await showList("followers")} /> */}
          <CustomList title="Followers" actionType="remove" dataUrl={`/api/people/followers`}
          profileId={profileId}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <div className="text-white cursor-pointer">
            {user?.noOfFollowings} Followings
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 border-none">
          {/* <CustomList getData={async () => await showList("followings")} /> */}
          <CustomList title="Followings" actionType="unfollow" dataUrl={'/api/people/followings'}
          profileId={profileId}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SocialStatus;
