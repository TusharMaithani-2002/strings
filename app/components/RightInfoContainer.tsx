
import React, { useState } from "react";
import AuthController from "./AuthController";

const RightInfoContainer = () => {
  return (
    <div className="w-2/3 h-scree flex justify-center items-center border-l-2 border-green-300">
      <AuthController />
    </div>
  );
};

export default RightInfoContainer;
