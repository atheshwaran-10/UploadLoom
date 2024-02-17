"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import UploadForm from "../Forms/UploadForm";
import { User } from "@prisma/client";
import { PlusCircle } from "lucide-react";

function UploadModal({ user }: { user: User }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="mt-4 flex w-full justify-end  pr-4">
        <Button
          onPress={onOpen}
          className="bg-purple-400/20 font-semibold  text-purple-500 hover:bg-purple-400/20"
        >
          <div className="flex flex-row gap-x-2">
            <PlusCircle />
            <h2 className="mt-[2px]">Upload</h2>
          </div>
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Image
              </ModalHeader>
              <ModalBody>
                <UploadForm user={user} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadModal;
