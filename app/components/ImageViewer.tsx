"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const ImageViewer = ({ images }: any) => {
  console.log("rendering image viewer");
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
    <div className="flex md:justify-center items-center w-2/3 border-2 border-dashed border-red-500 rounded-md p-3">
      {!images || !images.length ? (
        <div>No image selected</div>
      ) : (

        <div className="flex flex-col items-center">
        <div className="flex justify-center items-center gap-2">
          <IoMdArrowBack
            onClick={onBackClick}
            className="bg-gray-400 h-[40px] w-[50px] hover:bg-gray-500"
          />

          {images.length && (
            <div className="h-[300px] m-2">
              <Image
                src={images[currImage]}
                alt="selected image"
                width={300}
                height={300}
                className="object-fill"
              />
            </div>
          )}

          <IoMdArrowForward
            onClick={onForwardClick}
            className="bg-gray-400 h-[40px] w-[50px] hover:bg-gray-500"
          />
        </div>
            <div className="text-xs text-gray-400 text-center">{currImage+1}/{images.length}</div>
        </div>

      )}
    </div>
  );
};

export default ImageViewer;
