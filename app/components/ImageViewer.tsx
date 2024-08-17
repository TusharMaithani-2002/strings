"use client";

import CarouselImageViewer from "./CarouselImageViewer";

const ImageViewer = ({ images }: any) => {

  return (

    <div className="bg-gray-900 p-2">
      <CarouselImageViewer images={images}/>
    </div>
  );
};

export default ImageViewer;