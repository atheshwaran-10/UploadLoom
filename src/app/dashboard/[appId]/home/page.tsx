import React from "react";
import Card1 from "./components/1x1card";
import Card2 from "./components/2x2card";
import { db } from "@/server/db";
import { getCurrentUser } from "@/hooks/getCurrentUser";
const page = async ({ params }: { params: { appId: string } }) => {
  const user = await getCurrentUser();
  const app=await db.app.findFirst({
    where:{
      id:Number(params.appId)
    }
  })
  if (!user ||!app) {
    return <div>UnAuthorized</div>;
  }
  const images = await db.imagePost.findMany({
    where: {
      userId: user.id,
      appId: Number(params.appId),
    },
  });

  const recentUploads = images
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);


   const largestFiles = images
     .slice()
     .sort((a, b) => b.fileSize - a.fileSize)
     .slice(0, 5);

  const currentMonthImages = images.filter((image) => {
    const createdAt = new Date(image.createdAt);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return (
      createdAt.getMonth() === currentMonth &&
      createdAt.getFullYear() === currentYear
    );
  });

  const totalFileSize = images.reduce((agg, item) => {
    return agg + item.fileSize;
  }, 0);

  const currentMonthSize = currentMonthImages.reduce((agg, item) => {
    return agg + item.fileSize;
  }, 0);

  return (
    <div className="mt-12 mx-5">
      <div className="my-6">
        <h2 className="text-xl font-semibold">
          🎉 Congratulations, you have got a place to store files!
        </h2>
        <p className="text-slate-400">lots of files. So many files!</p>
      </div>
      <div className="grid grid-cols-4 gap-5 px-4">
        <Card1
          title={"Total Files"}
          count={String(images.length)}
          filter={"All time"}
        />
        <Card1
          title={"Files Uploaded"}
          count={String(currentMonthImages.length)}
          filter={"Past Month"}
        />
        <Card1
          title={"Usage"}
          count={`${String(totalFileSize.toFixed(2))}/${app.appLimit} MB`}
          filter={"Total"}
        />
        <Card1
          title={"Usage"}
          count={`${String(currentMonthSize.toFixed(2))} MB`}
          filter={"Past Month"}
        />
        <Card2 title={"Recent Uploads"} items={recentUploads} />
        <Card2 title={"Largest Files"} items={largestFiles} />
      </div>
    </div>
  );
};

export default page;
