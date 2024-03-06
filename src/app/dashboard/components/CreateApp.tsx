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
import AppForm from "./AppForm";
import { User } from "@prisma/client";
import { PlusCircle } from "lucide-react";

function CreateApp({ user }: { user: User }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="mt-4 flex w-full justify-end  pr-4">
        <Button
          onPress={onOpen}
          className="bg-purple-400/20 font-semibold text-purple-500 hover:bg-purple-400/20"
        >
          <div className="flex flex-row gap-x-2">
            <PlusCircle />
            <h2 className="mt-[2px]">Create App</h2>
          </div>
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="">
                Create App
              </ModalHeader>
              <ModalBody className="p-2">
                <AppForm user={user!} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateApp;
