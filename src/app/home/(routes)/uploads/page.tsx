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

const page = async () => {
  const user = await getCurrentUser();
  return (
      <div>
        <UploadModal user={user!} />
        <ImageShow user={user!} />
      </div>
  );
};

export default page;
