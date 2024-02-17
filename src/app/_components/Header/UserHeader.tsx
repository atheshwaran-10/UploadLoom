"use client";
import React from "react";
import Image from "next/image";
import placeholder from "~/public/images/placeholder.png";
import { User } from "@prisma/client";
import useHeaderTitle from "@/store/HeaderTitle";
import { signOut, signIn } from "next-auth/react";
import clsx from "clsx";
import toast from "react-hot-toast";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const UserHeader = ({ user }: { user?: User }) => {
  const socialAction = (action: string) => {
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid credentials!");
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Login Successfull");
      }
    });
  };

  const { title } = useHeaderTitle();
  return (
    <div className="flex flex-row justify-between">
      <h2 className="p-3 text-xl font-bold text-white">{title}</h2>
      <Dropdown>
        <DropdownTrigger>
          <Image
            src={user?.image || placeholder}
            height={user ? 60 : 65}
            width={user ? 60 : 65}
            className="cursor-pointer rounded-full p-3"
            alt="user Image"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new" className="text-warning cursor-default ">
            {user?.name || "Guest"}
          </DropdownItem>
          <DropdownItem
            key="delete"
            color={user ? "danger" : "primary"}
            className={clsx(
              "text-danger cursor-pointer text-sm font-semibold hover:border-0 ",
              { "text-white hover:text-slate-400": !user },
            )}
            onClick={user ? () => signOut() : () => socialAction("discord")}
          >
            {user ? "SignOut" : "SignIn"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserHeader;
