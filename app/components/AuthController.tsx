"use client";

import React, { useRef, useState } from "react";
import Button from "./ui/Button";
import Link from "next/link";
import Image from "next/image";

const AuthController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show,setShow] = useState(false);

  const toggleShow = () => {
    setShow(prev => !prev);
  }

  const handleSubmit = () => {}

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div>
        <div className="font-bold text-2xl ml-4">Strings</div>

        <form className="flex flex-col items-center">
          
            <input
              type="email"
              placeholder="email address"
              className="login-input"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          

          
            <input
              type={show?"text" : "password"}
              placeholder="enter your password"
              className="login-input"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button className="text-gray-500" clickAction={toggleShow} type="button">show password</Button>

          <Button className="bg-green-500 rounded-md p-2 text-white w-[250px] mt-5 mb-10">Sign In</Button>
        </form>

        <div className="text-center text-gray-700 mb-2">Or with</div>

        <div className="flex flex-col items-center gap-2">
          <Button className="bg-blue-500 rounded-md p-2 text-white flex justify-evenly w-[250px] h-[40px] items-center"> <Image src={"/google.png"} alt="google icon" width={15} height={15}/> SignIn with google </Button>
          <Button className="bg-red-500 rounded-md p-2 text-white w-[250px] h-[40px] flex justify-evenly items-center"><Image src={"/github-logo.png"} alt="github icon" width={15} height={15}/>SingIn with github</Button>
        </div>
      </div>
    </div>
  );
};

export default AuthController;
