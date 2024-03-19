import React from "react";
import LeftIntoContainer from "../components/LeftIntoContainer";
import RightInfoContainer from "../components/RightInfoContainer";

const page = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <LeftIntoContainer />
      <RightInfoContainer />
    </div>
  );
};

export default page;
