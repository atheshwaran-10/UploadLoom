"use client";
import React from "react";
import { trpc } from "@/lib/trpc";
import { User } from "@prisma/client";
import Loader from "@/app/_components/Uploads/Loader";
import AppCard from "./AppCard";
import toast from "react-hot-toast";
const Apps = ({ user }: { user: User }) => {
  const { data, isLoading, isError } = trpc.app.getAll.useQuery({
    userId: user.id,
  });
  if (isError) toast.error("Something went wrong");
  return (
    <div className="mt-4">
      {isLoading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 ">
          <Loader ind={6} />
        </div>
      )}
      {data && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 ">
          {data.map((app, index) => (
            <div className="w-full" key={index}>
              <AppCard key={index} app={app!} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Apps;
