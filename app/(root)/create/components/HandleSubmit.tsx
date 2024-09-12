import { addPost } from "@/actions/post.action";
import Button from "@/app/components/ui/Button";
import React from "react";

interface Props {
  content: string;
  images: string[];
  mentions: any[];
  tags: string[];
  group: any;
  author: string;
  reRoute: () => void;
}
const HandleSubmit = ({
  content,
  images,
  mentions,
  tags,
  group,
  author,
  reRoute,
}: Props) => {
  const handleSubmit = async () => {
    if (images?.length === 0 && content?.length === 0) return;
    let mentionedUser: any[] = mentions?.map((mention) => mention._id);
    const data = {
      content,
      images,
      mentions: mentionedUser,
      tags,
      group: group?.value,
      author,
    };

    try {
      const response = await addPost(data, "/home");
    } catch (error: any) {
      console.log(error);
      if (error.message === "Maximum call stack size exceeded"){
        console.log('rerouting')
        reRoute()
      }
    }
  };

  return (
    <Button
      type="button"
      className="bg-[#E90064]  text-white p-2 px-4 rounded-md mt-3
    hover:bg-[#E90061] 
    "
      clickAction={handleSubmit}
    >
      submit
    </Button>
  );
};

export default HandleSubmit;
