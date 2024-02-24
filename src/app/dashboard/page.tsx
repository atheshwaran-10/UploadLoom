import React from "react";
import Apps from "./components/Apps";
import CreateApp from "./components/CreateApp";
import { getCurrentUser } from "@/hooks/getCurrentUser";
const page = async () => {
  const user = await getCurrentUser();
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
