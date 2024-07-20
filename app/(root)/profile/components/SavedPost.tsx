import PostCard from "../../../components/PostCard";
import { getSavedPosts } from "@/actions/user.action";

interface Post {
  _id: string;
  likedIds: string[];
  likesCount: number;
  author: any;
  tags: string[];
  repliesCount: number;
  group: string;
  images: string[];
  createdAt: string;
  content: string;
}

const SavedPost = async ({ userId }: { userId: string }) => {


  const posts:Post[] = await getSavedPosts(userId);
  return (
    <div className="flex flex-1 flex-col sm:pb-5">
      {posts?.map((post, index: number) => (
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
            createdAt={new Date(post.createdAt)}
            content={post.content}
          />
        </div>
      ))}
    </div>
  );
};

export default SavedPost;
