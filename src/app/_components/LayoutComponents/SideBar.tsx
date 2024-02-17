"use client"

import React from "react";
import Image from "next/image";
import logo from "~/public/images/logo2.png";
import { UploadCloud, Code, Palette, GalleryHorizontal } from "lucide-react";
import SideBarItem from "./SideBarItem";

const SideBarRoutes = [
  {
    name: "Uploads",
    icon: UploadCloud,
    route: "/uploads",
  },
  {
    name: "Developer Mode",
    icon: Code,
    route: "/dev",
  },
  {
    name: "Card Maker",
    icon: Palette,
    route: "/card",
  },
  {
    name: "Memories",
    icon: GalleryHorizontal,
    route: "/memories",
  },
];

const SideBar = () => {
  return (
    <div className="">
      <div className="flex flex-row gap-x-4">
        <Image
          src={logo}
          height={80}
          width={80}
          className="rounded-full"
          alt="Logo"
        />
      </div>
      <div className="mt-12">
        {SideBarRoutes.map((route, ind) => (
          <SideBarItem
            name={route.name}
            Icon={route.icon}
            route={route.route}
            key={ind}       
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
