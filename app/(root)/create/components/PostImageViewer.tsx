import Image from "next/image";
import React, { useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const PostImageViewer = ({ images }: any) => {
  const [currImage, setCurrImage] = useState(0);
  const onForwardClick = () => {
    setCurrImage((prev) => (prev + 1) % images.length);
  };

  const onBackClick = () => {
    if (currImage == 0) {
      setCurrImage(images.length - 1);
      return;
    }

    setCurrImage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="flex items-center">
        <IoMdArrowBack
          onClick={onBackClick}
          className="bg-green-400 h-[30px] w-[30px] hover:bg-green-500 fill-white rounded-full hidden md:block"
        />
        <div>

            

           <Image
            src={images[currImage]}
            alt={"post image"}
            width={400}
            height={400}
            className="object-contain w-[500px] h-[300px] m-0 md:mx-2"
          />
       
          
          
        </div>
        <IoMdArrowForward
          onClick={onForwardClick}
          className="bg-green-400 h-[30px] w-[30px] hover:bg-green-500 fill-white rounded-full
          hidden md:block
          "
        />
      </div>
      <div>
      <span className="text-gray-500">{currImage + 1}</span>/<span className="text-green-600">{images.length}</span>
      </div>
    </div>
  );
};

export default PostImageViewer;
