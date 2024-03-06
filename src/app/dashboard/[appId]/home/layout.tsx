import React from "react";
import SideBar from "@/app/_components/LayoutComponents/SideBar";

import { db } from "@/server/db";
import Header from "./components/Header";
import { getCurrentUser } from "@/hooks/getCurrentUser";
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { appId: string };
}) {
  const user=await getCurrentUser();
  if(!user)
  {
    return(
      <>
        UnAuthorized
      </>
    )
  }
  const app = await db.app.findFirst({ where: { id: Number(params.appId) } });
  const allApps=await db.app.findMany({where:{userId:user.id}});
  return (
    <div className="">
      <div className="grid-cols-15 grid">
        <div className="col-span-2 h-full">
          <Header app={app!} allApps={allApps} />
          <SideBar appId={params.appId} />
        </div>
        <div className="col-span-13  h-full ">{children}</div>
      </div>
    </div>
  );
}
