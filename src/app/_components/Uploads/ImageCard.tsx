import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ImagePost } from "@prisma/client";
import React from "react";
import ImageModal from "../Modals/ImageModal";
import { Trash } from "lucide-react";

const ImageCard = ({ index, item }: { index: number; item: ImagePost }) => {
  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB");

  return (
    <Card shadow="sm" key={index} isPressable>
      <ImageModal image={item}>
        <CardBody className="w-full overflow-hidden ">
          <Image
            radius="lg"
            width="100%"
            alt={item.name}
            className="h-[140px] p-2"
            src={item.imgUrl}
          />
        </CardBody>
      </ImageModal>

      <CardFooter className="justify-between text-small">
        <p>{item.name}</p>
        <p className="text-default-500">{formattedDate}</p>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
