"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  clickAction?: (event: React.MouseEvent) => void;
  className?: string;
  type?:"submit"|"reset"|"button"|undefined;
}
const Button = ({ children, clickAction, className,type }: Props) => {

  return (
    <button className={className} onClick={clickAction} type={type}>
      {children}
    </button>
  );
};

export default Button;
