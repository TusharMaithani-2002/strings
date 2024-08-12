'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

const CarouselImageViewer = ({ images }: { images: string[] }) => {

    const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {

    if(!api) {
        return
      }
   
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
   
      api.on("select", () => {
        console.log(api)
        setCurrent(api.selectedScrollSnap() + 1)
      })
  },[api])

  return (

    <div className="flex flex-col w-full">
    <Carousel
    opts={
        {
            loop:true,
        }
    }
    setApi={setApi}
    className=""
    >
      <CarouselContent className="">   
        {images?.map((image, i) => (
          <CarouselItem key={i} className="flex justify-center items-center">
            <Image alt="post image" width={400} height={400} src={image} 
            className="object-contain w-[500px] h-[300px] m-0 md:mx-2"
            />
            
          </CarouselItem>
        ))}
       
      </CarouselContent>
      <CarouselPrevious className="bg-gray-800"/>
      <CarouselNext className="bg-gray-800"/>
    </Carousel>

    <span className="text-white text-center">{current}/{count}</span>
    </div>
  );
};

export default CarouselImageViewer;
