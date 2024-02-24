"use client";

import React from "react";
import {
  UploadCloud,
  Code,
  Palette,
  GalleryHorizontal,
  CreditCard,
  Settings,
  Home,
  LucideHome,
  Files,
} from "lucide-react";
import SideBarItem from "./SideBarItem";

const SideBarRoutes = [
  {
    name: "Home",
    icon: LucideHome,
    route: "/home",
  },
  {
    name: "Files",
    icon: Files,
    route: "/home/uploads",
  },
  {
    name: "API",
    icon: Code,
    route: "/home/dev",
  },
  {
    name: "Plans",
    icon: CreditCard,
    route: "/home/plans",
  },
  {
    name: "Settings",
    icon: Settings,
    route: "/home/settings",
  },
];

const SideBar = ({ appId }: { appId: string }) => {
  return (
    <div className="">
      <div className="">
        {SideBarRoutes.map((route, ind) => (
          <SideBarItem
            appId={appId}
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
