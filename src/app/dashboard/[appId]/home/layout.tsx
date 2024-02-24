import SideBar from "@/app/_components/LayoutComponents/SideBar";
import { Avatar } from "@nextui-org/react";

import { db } from "@/server/db";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { appId: string };
}) {
  const app = await db.app.findFirst({ where: { id: Number(params.appId) } });
  return (
    <div className="">
      <div className="grid-cols-15 grid">
        <div className="col-span-2 h-full">
          <div className="m-4 flex flex-row gap-x-3 cursor-pointer">
            <Avatar
              isBordered
              radius="sm"
              className="bg-purple-500 text-xl font-bold text-white"
              name={app?.name.substring(0, 1)}
            />
            <p className="mt-2 font-bold text-slate-800 text-md">{app?.name}</p>

          </div>
          <SideBar appId={params.appId} />
        </div>
        <div className="col-span-13  h-full ">{children}</div>
      </div>
    </div>
  );
}
