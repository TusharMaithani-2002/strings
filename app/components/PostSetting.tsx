"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiDotsVertical } from "react-icons/hi";
import Button from "./ui/Button";
import AlertDialogImp from "../components/AlertDialogImp";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { redirect, usePathname, useRouter } from "next/navigation";
import { deletePost } from "@/actions/post.action";
import { useAppContext } from "../context/context";

interface Props {
  postId:string;
  parent?:string;
  author:string;
}

const Page = ({postId,parent,author}:Props) => {

  const pathname = usePathname();
  const router = useRouter();
  const {user} = useAppContext();


  if(user?._id != author) return null;

  const handleDelete = async () => {
    await deletePost(postId,pathname)

    const pathnameId = pathname.split('/').pop();
    
    if(postId == pathnameId) {
      console.log(`/post/${parent}`)
      // if(parent) redirect(`/post/${parent}`);
      // else redirect('/home')

      if(parent) router.push(`/post/${parent}`);
      else router.push('/home')
    }
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <HiDotsVertical
            fill="#E90064"
            className="h-[25px] w-[30px] cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className="w-[100px] md:w-[200px] bg-[rgba(16,16,16,1)] border-none">
          <div className="flex flex-col">
            <span className="bg-red-500 text-white hover:bg-red-600 p-2 rounded-sm m-2 w-[60px] md:w-[100px]">
            
            <AlertDialogImp
              content={"You sure want to delete this post?"}
              action={handleDelete}
              actionDescription="Delete"
              title="Delete Post"
              trigger={<MdOutlineDelete className="h-[20px] w-[20px]" />}
              triggerDescription={"Delete"}
            />
            </span>
            <Button className="bg-[#E90064] text-white hover:bg-[#e90046]  p-2 rounded-sm m-2 w-[60px] md:w-[100px]"><FaRegEdit 
            className="h-[20px] w-[20px]"/> <span className="text-white hidden md:block">Edit</span></Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default Page;
