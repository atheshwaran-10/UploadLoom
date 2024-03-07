import React from "react";
import SideBar from "@/app/_components/LayoutComponents/SideBar";

import { db } from "@/server/db";
import Header from "./components/Header";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import MobileSidebar from "@/app/_components/LayoutComponents/MobileSideBar";
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { appId: string };
}) {
  const user = await getCurrentUser();
  if (!user) {
    return <>UnAuthorized</>;
  }
  const app = await db.app.findFirst({ where: { id: Number(params.appId) } });
  const allApps = await db.app.findMany({ where: { userId: user.id } });
  return (
    <div className="">
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        <div className=" justify-start2xl:justify-start mx-4 flex h-full w-1/5 flex-col items-start justify-start sm:items-end sm:justify-end md:items-start md:justify-start lg:items-start lg:justify-start xl:items-start xl:justify-start 2xl:items-start">
          <div className="flex flex-row-reverse justify-between ">
            <Header app={app!} allApps={allApps} />
            <MobileSidebar appId={params.appId} />
          </div>
          <div className="w-full  max-sm:hidden md:block lg:block">
            <SideBar appId={params.appId} />
          </div>
        </div>
        <div className=" h-full w-full ">{children}</div>
      </div>
    </div>
  );
}
