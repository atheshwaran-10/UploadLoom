"use client";
import { LucideIcon, Rotate3D } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import useHeaderTitle from "@/store/HeaderTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarItemProps {
  name: string;
  Icon: LucideIcon;
  route: string;
  appId: string;
  isMobile: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  name,
  Icon,
  route,
  appId,
  isMobile,
}) => {
  const { title, setTitle } = useHeaderTitle();
  const pathname = usePathname();
  const currentPath = `/dashboard/${appId}${route}`;
  console.log(pathname);

  return (
    <Link href={`/dashboard/${appId}${route}`}>
      <div
        className={cn(
          "my-3 flex cursor-pointer flex-row justify-between rounded-lg p-4",
        )}
        onClick={() => {
          setTitle(name);
        }}
      >
        <div className="flex flex-row gap-x-2">
          <Icon
            className={cn(" text-slate-600", {
              "text-purple-600": currentPath === pathname,
            })}
            size={20}
          />
          {!isMobile && (
            <div
              className={cn("text-md font-semibold text-slate-600", {
                "text-purple-600": currentPath === pathname,
              })}
            >
              {name}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SideBarItem;
