"use client";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface Props {
  children: React.ReactNode;
  clickAction?: any
  className?: string;
  type?:"submit"|"reset"|"button"|undefined;
}




const Button = ({ children, clickAction, className,type }: Props) => {

  const [loading,setLoading] = useState(false);
  return (
    <button className={className} onClick={async(event)=>{
      setLoading(true);

      if(typeof clickAction === 'function')
      await clickAction()
      setLoading(false);
    }} type={type}>

      <span className="flex items-center justify-around w-full">{loading ? <LoadingSpinner />:""} {children}</span>
     
    </button>
  );
};

export default Button;
