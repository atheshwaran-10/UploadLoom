"use client";
import React from "react";
import { App, User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { Avatar } from "@nextui-org/react";
import { LogOut, User as Profile } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Modal,
  ModalContent,
  Chip,
  ModalBody,
  useDisclosure,
  Button,
  User as ProfileAvatar,
  Avatar as UserIcon,
} from "@nextui-org/react";

const UserHeader = ({ user, apps }: { user?: User; apps: App[] }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentAppsUsed = 3 - (user?.userLimit ?? 0);

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
              {/* <ModalHeader className="flex flex-col gap-1">
                {user?.name}
              </ModalHeader> */}
              <ModalBody>
                <div className="mb-4">
                  <div className="text-xl font-semibold">Account</div>
                  <div>Manage your account information</div>
                </div>
                <div className="mr-auto">
                  <h2 className="text-md text-slate-800">Profile</h2>
                  <ProfileAvatar
                    name={user?.name}
                    avatarProps={{
                      src: user?.image!,
                    }}
                  />
                </div>
                <div className="mr-auto w-full">
                  <h2 className="text-md text-slate-800">Email</h2>
                  <div className="flex flex-row gap-x-4">
                    <h2 className="text-sm text-slate-800">{user?.email}</h2>
                    <Chip color="primary" size="sm">
                      Primary
                    </Chip>
                  </div>
                </div>
                <div className="mr-auto w-full">
                  <h2 className="text-md text-slate-800">
                    Apps {currentAppsUsed}/3
                  </h2>
                  <div className="mt-4 flex flex-col gap-y-4">
                    {apps.map((app,index) => (
                      <div key={index} className="flex flex-row gap-x-5 cursor-pointer hover:bg-slate-200 p-3 rounded-lg" onClick={()=>{router.push(`/dashboard/${app.id}/home`);onClose()}} >
                        <Avatar
                          isBordered
                          size="sm"
                          radius="sm"
                          className="bg-purple-500 text-xl font-bold text-white"
                          name={app?.name.substring(0, 1)}
                        />
                        <h2>{app.name}</h2>
                        <h2 className="ml-auto text-xs text-neutral-500">{(app.appLimit/1024).toFixed(2)} GB</h2>
                      </div>
                    ))}
                  </div>
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
