import React from "react";
import ImageShow from "@/app/_components/Uploads/ImageShow";
import UploadButton from "@/app/_components/Uploads/UploadButton";
import UploadModal from "@/app/_components/Modals/UploadModal";
import { getCurrentUser } from "@/hooks/getCurrentUser";

type ImagesSchema = {
  id: number;
  name: string;
  imgUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

const page = async ({params}:{params:{appId:string}}) => {
  const user = await getCurrentUser();
  return (
    <div>
      <UploadModal user={user!} appId={params.appId} />
      <ImageShow user={user!} appId={params.appId} />
    </div>
  );
};

export default page;
