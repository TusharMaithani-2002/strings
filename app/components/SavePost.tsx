"use client";
import { savePostToUserAccount } from "@/actions/user.action";
import { BsSave, BsSaveFill } from "react-icons/bs";
import { useAppContext } from "../context/context";
import { usePathname } from "next/navigation";

interface Props {
  postId: string;
}

const SavePost = ({ postId }: Props) => {
  //@ts-ignore
  const { user, savedPosts , setSavedPosts } = useAppContext();

  const pathname = usePathname();

  const handleSavePost = async () => {
    let currentSavedPosts:Set<string> = savedPosts;
    if(currentSavedPosts.has(postId)) currentSavedPosts.delete(postId);
    else currentSavedPosts.add(postId);

    setSavedPosts(currentSavedPosts)
    await savePostToUserAccount(postId, user._id, pathname);
  };
  return (
    <div className="ml-1">
      {savedPosts?.has(postId) ? (
        <BsSaveFill
          style={{ height: "25px", width: "25px" }}
          className={`cursor-pointer fill-[#E90064]`}
          onClick={handleSavePost}
        />
      ) : (
        <BsSave
          style={{ height: "25px", width: "25px" }}
          onClick={handleSavePost}
          className="cursor-pointer fill-[#E90064]"
        />
      )}
    </div>
  );
};

export default SavePost;
