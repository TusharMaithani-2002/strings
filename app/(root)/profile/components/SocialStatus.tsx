
interface Props { 
    user:any;
}

const SocialStatus = ({user}:Props) => {
  return (
    <div className="flex flex-row w-full justify-around text-xl">
        <div className="text-white">9 posts</div>
        <div className="text-white cursor-pointer">200 Followers</div>
        <div className="text-white cursor-pointer">400 Followings</div>
    </div>
  )
}

export default SocialStatus
