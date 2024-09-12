"use client";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface Props {
  children: React.ReactNode;
  clickAction?:  (() => Promise<void>) | (() => void)
  className?: string;
  type?:"submit"|"reset"|"button"|undefined;
}




const Button = ({ children, clickAction, className,type }: Props) => {

  const [loading,setLoading] = useState(false);
  return (
    <button className={className} onClick={async(event)=>{
      setLoading(true);

      try {
        if(typeof clickAction === 'function') await clickAction()
        setLoading(false);
      } catch(error:any) {
        console.log(error)
        setLoading(false)
      }
    }} 
    type={type}>

      <span className="flex items-center justify-around w-full">{loading ? <LoadingSpinner />:""} {children}</span>
     
    </button>
  );
};

export default Button;
