"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  clickAction?: (event: React.MouseEvent) => void;
  className?: string;
}
const Button = ({ children, clickAction, className }: Props) => {

  return (
    <button className={className} onClick={clickAction}>
      {children}
    </button>
  );
};

export default Button;
