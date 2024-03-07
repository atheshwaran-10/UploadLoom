"use client";
import React from "react";
import { User } from "@prisma/client";
import Loader from "./Loader";
import { trpc } from "@/lib/trpc";
import { useSearchParams } from "next/navigation";
import ImageCard from "./ImageCard";

interface ImageShowProps {
  user?: User;
  appId: string;
}


const ImageShow: React.FC<ImageShowProps> = ({ user, appId }) => {
  if (!user) {
    return <div>SignUp now</div>;
  }
  console.log(appId)

  const {
    data: images,
    isLoading,
    isError,
  } = trpc.image.getAll.useQuery(
    { userId: user.id, appId: appId },
    {
      staleTime: 5000,
      cacheTime: 30000,
    },
  );

  return (
    <div className="flex  w-full items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4  xl:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 gap-8 p-3">
        {isLoading ? (
          <Loader ind={8} />
        ) : images ? (
          images.map((image, ind) => (
            <div key={ind} className="w-full">
              <ImageCard index={ind} item={image} key={ind} />
            </div>
          ))
        ) : (
          <div className="col-span-4 h-screen w-full items-center justify-center">
            No Images Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageShow;
