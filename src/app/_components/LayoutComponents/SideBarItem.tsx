"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import useHeaderTitle from "@/store/HeaderTitle";
import { useRouter } from "next/navigation";


interface SideBarItemProps {
  name: string;
  Icon: LucideIcon;
  route: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ name, Icon, route }) => {
  const { title, setTitle } = useHeaderTitle();
  const router=useRouter();
  return (
    <div
      className={cn(
        "my-12 flex cursor-pointer flex-row justify-between rounded-lg p-4",
      )}
      onClick={() => {
        setTitle(name);
        router.push(`/home/${route}`)

      }}
    >
      <div className="flex flex-row gap-x-2">
        <Icon
          className={cn(" rounded-full text-white", {
            "text-purple-600": title === name,
          })}
          size={28}
        />
      </div>
      {title === name && (
        <div
          className={cn("h-6 w-1  rounded-full bg-purple-600", {
            "text-purple-600": title === name,
          })}
        />
      )}
    </div>
  );
};

export default SideBarItem;
