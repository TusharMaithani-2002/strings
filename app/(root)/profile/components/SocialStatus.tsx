
interface Props { 
    user:any;
}

const SocialStatus = ({user}:Props) => {
  return (
    <div className="flex flex-row w-full justify-around text-xl">
        <div className="text-white">{user.noOfPosts} posts</div>
        <div className="text-white cursor-pointer">{user.noOfFollowers} Followers</div>
        <div className="text-white cursor-pointer">{user.noOfFollowings} Followings</div>
    </div>
  )
}

export default SocialStatus
