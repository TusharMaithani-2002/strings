"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  
  interface Props {
    content: string;
    action?: ()=>void;
    trigger?: any;
    title: string;
    actionDescription: string;
    triggerDescription?:string
  }
  
  const Page = ({
    content,
   action,
    trigger,
    title,
    actionDescription,
    triggerDescription
  }: Props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="w-full flex items-center justify-evenly">{trigger}<span className="text-white hidden md:block">{triggerDescription}</span></AlertDialogTrigger>
  
        <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
  
        <AlertDialogFooter>
          <AlertDialogCancel>cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action}>{actionDescription}</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default Page;
  