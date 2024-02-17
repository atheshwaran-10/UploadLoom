"use client";
import React from "react";
import { User } from "@prisma/client";
import Loader from "./Loader";
import { trpc } from "@/lib/trpc";
import ImageCard from "./ImageCard";

interface ImageShowProps {
  user?: User;
}

const ImageShow: React.FC<ImageShowProps> = ({ user }) => {
  if (!user) {
    return <div>SignUp now</div>;
  }

  const {
    data: images,
    isLoading,
    isError,
  } = trpc.image.getAll.useQuery(
    {  userId:user.id  },
    {
      staleTime: 5000,
      cacheTime: 30000,
    },
  );

  return (
    <div className="flex  w-full items-center justify-center">
      <div className="grid grid-cols-4 gap-8 p-3">
        {isLoading ? (
            <Loader ind={8} />
        ) : (
          images ?
          images.map((image, ind) => (
            <div key={ind} className="w-full">
              <ImageCard index={ind} item={image} key={ind} />
            </div>
          )):(
            <div className="w-full h-screen justify-center col-span-4 items-center">
              No Images Found
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageShow;
