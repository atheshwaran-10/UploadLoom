"use client";
import React from "react";
import Apps from "./components/Apps";
import { Spinner } from "@nextui-org/react";
import CreateApp from "./components/CreateApp";
import { trpc } from "@/lib/trpc";
const page = () => {
  const { data: user, isLoading } = trpc.user.getCurrent.useQuery();
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-12 my-4">
      <div className="flex flex-row justify-between">
        <h2 className="w-full text-2xl font-semibold">Your Apps</h2>
        <CreateApp user={user!} />
      </div>
      <div>
        <Apps user={user!} />
      </div>
    </div>
  );
};

export default page;
