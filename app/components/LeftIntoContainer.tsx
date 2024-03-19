import React from "react";

const LeftIntoContainer = () => {
  return (
    <div className="md:w-1/3 h-screen flex flex-col justify-center items-center">
      <div>
        <span className="font-extrabold text-5xl">Strings</span>
        <div className="text-2xl">
          A social Media{" "}
          <span className="font-bold text-green-500">Application</span>
        </div>
        <div className="text-xl">
          <span className="text-green-500 font-semibold">Best</span> Alternative
          for X
        </div>
      </div>
    </div>
  );
};

export default LeftIntoContainer;
