import React from "react";
import { banner1, banner2, banner3, banner4 } from "@/constants/images";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

type props = {
  ImagePost: {
    id: number;
    name: string;
    imgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    appId: number | null;
  }[];
} & {
  id: number;
  name: string;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

const AppCard = ({ app, index }: { app: props; index: number }) => {
  const images = [banner1, banner2, banner3, banner4];
  const ImageIndex = index % 3;
  return (
    <Link href={`/dashboard/${app.id}/home/uploads`}>
      <div className="aspect-video w-full">
        <Card
          shadow="sm"
          key={index}
          className="w-full"
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <div className=" aspect-video">
              <Image
                fill
                alt={app.name}
                className="w-full "
                src={images[ImageIndex]!}
              />
            </div>
          </CardBody>
          <CardFooter className="justify-between text-left text-small">
            <div className="">
              <b className="text-left text-lg">{app.name}</b>
              <p className="text-default-500">{app.url || "No URL defined"}</p>
            </div>
            <div>{app.ImagePost.length} images</div>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
};

export default AppCard;
