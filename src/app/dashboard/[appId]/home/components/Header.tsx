"use client";
import React from "react";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { App } from "@prisma/client";
const Header = ({ app, allApps }: { app: App; allApps: App[] }) => {
  const router = useRouter();
  return (
    <div>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <div className="m-4 flex cursor-pointer flex-row gap-x-3">
            <Avatar
              isBordered
              radius="sm"
              className="bg-purple-500 text-xl font-bold text-white"
              name={app?.name.substring(0, 1)}
            />
            <p className="text-md mt-2 font-bold text-slate-800">{app?.name}</p>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {allApps.map((app, index) => (
            <DropdownItem
              startContent={
                <Avatar
                  isBordered
                  size="sm"
                  radius="sm"
                  className="bg-purple-500 text-xl font-bold text-white"
                  name={app?.name.substring(0, 1)}
                />
              }
              onClick={() => router.push(`/dashboard/${app.id}/home`)}
              key={index}
            >
              {app.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Header;
