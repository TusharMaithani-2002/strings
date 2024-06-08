"use client";
import { savePostToUserAccount } from "@/actions/user.action";
import { useState } from "react";
import { BsSave, BsSaveFill } from "react-icons/bs";
import { useAppContext } from "../context/context";

interface Props {
  postId: string;
  path?: string;
}

const SavePost = ({ postId, path }: Props) => {
  //@ts-ignore
  const { user } = useAppContext();
  const [saved, setSave] = useState(user?.savedPosts?.indexOf(postId) != -1);

  console.log(user, saved);

  const handleSavePost = async () => {
    setSave((prev) => !prev);
    await savePostToUserAccount(postId, user._id, path);
  };
  return (
    <div className="ml-1">
      {saved ? (
        <BsSaveFill
          style={{ height: "25px", width: "25px" }}
          className={`cursor-pointer fill-green-600`}
          onClick={handleSavePost}
        />
      ) : (
        <BsSave
          style={{ height: "25px", width: "25px" }}
          onClick={handleSavePost}
          className="cursor-pointer fill-green-600"
        />
      )}
    </div>
  );
};

export default SavePost;
