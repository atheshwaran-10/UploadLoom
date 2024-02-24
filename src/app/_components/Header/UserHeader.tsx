"use client";
import React from "react";
import Image from "next/image";
import placeholder from "~/public/images/placeholder.png";
import { User } from "@prisma/client";
import { signOut, signIn } from "next-auth/react";
import { DoorOpen, LogOut, User as Profile } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  User as Avatar,
  Avatar as UserIcon
} from "@nextui-org/react";

const UserHeader = ({ user }: { user?: User }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="mx-20 flex flex-row justify-between">
      <div className="mt-4 flex">
        <span
          className="text-2xl font-bold  hover:cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          upload<span className="text-[#9333EA]">loom</span>
        </span>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {user?.name}
              </ModalHeader>
              <ModalBody>
                <div className="mr-auto">
                  <Avatar
                    name={user?.name}
                    description={user?.email}
                    avatarProps={{
                      src: user?.image!,
                    }}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Popover>
        <PopoverTrigger asChild className="mt-4">
          {user && (
            <UserIcon
              size="sm"
              isBordered
              color="default"
              className="cursor-pointer"
              showFallback
              src={user?.image!}
            />
          )}
        </PopoverTrigger>
        <PopoverContent className="rounded-lg p-3" side="bottom" align="start">
          <div className="pb-4 text-sm font-medium text-neutral-600">
            <div className="text-md px-1 capitalize">{user?.name}</div>
            <div className="px-1 text-sm ">{user?.email}</div>
          </div>
          <Separator />
          <Button
            variant="ghost"
            className="h-auto w-full justify-start rounded-md border-0 p-2 text-sm font-normal"
            onClick={onOpen}
          >
            <div className="flex flex-row gap-x-2">
              <Profile size={18} /> <h2>Profile</h2>
            </div>
          </Button>
          <Button
            variant="ghost"
            className="h-auto w-full justify-start  rounded-md border-0 p-2 text-sm font-normal"
            onClick={() => signOut()}
          >
            <div className="flex flex-row gap-x-2">
              <LogOut size={18} /> <h2>Logout</h2>
            </div>
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserHeader;
