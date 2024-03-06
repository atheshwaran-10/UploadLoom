"use client";
import React from "react";
import Header from "./components/Header";
import { Spinner } from "@nextui-org/react";
import EditForm from "./components/EditForm";
import { trpc } from "@/lib/trpc";
const page = ({ params }: { params: { appId: string } }) => {
  const { data, isLoading } = trpc.app.getById.useQuery({
    id: Number(params.appId),
  });
  if (isLoading) {
    return (
      <div className="flex h-screen w-full  justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="m-12  rounded-lg border border-solid p-2">
        <EditForm app={data!} />
      </div>
    </div>
  );
};

export default page;
