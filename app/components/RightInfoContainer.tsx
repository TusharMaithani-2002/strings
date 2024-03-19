
import React, { useState } from "react";
import AuthController from "./AuthController";

const RightInfoContainer = () => {
  return (
    <div className="md:w-2/3 h-screen flex justify-center items-center">
      <AuthController />
    </div>
  );
};

export default RightInfoContainer;
