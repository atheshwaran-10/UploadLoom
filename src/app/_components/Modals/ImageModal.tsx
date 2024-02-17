import React from 'react'
import { Image } from '@nextui-org/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { ImagePost } from '@prisma/client';

const ImageModal = ({children,image}:{children:React.ReactNode,image:ImagePost}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const downloadImage = () => {
    fetch(image.imgUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = image.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };
  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {image.name}
              </ModalHeader>
              <ModalBody>
                <Image
                  width={480}
                  src={image.imgUrl}
                  alt="Image"
                  className=""
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={downloadImage}>
                  Download
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModal