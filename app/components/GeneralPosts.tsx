
import { getAllPost } from '@/actions/post.action'
import PostCard from './PostCard';

interface Props {
  userId?:string;
  postType?:string;
}

const GeneralPosts = async({userId,postType}:Props) => {

  const posts = await getAllPost(userId,postType);

  return (
    <div className="flex flex-1 flex-col sm:pb-5">
             {posts?.map((post, index) => (
          <div key={index} className="w-full">
            <PostCard
            id={post._id}
            likedIds={post.likedIds}
            likesCount={post.likesCount}
            author={post.author}
            tags={post.tags}
            group={post.group}
            repliesCount={post.repliesCount}
            images={post.images}
            createdAt={post.createdAt}
            content={post.content}
            />
          </div>
        ))}
    </div>
  )
}

export default GeneralPosts
