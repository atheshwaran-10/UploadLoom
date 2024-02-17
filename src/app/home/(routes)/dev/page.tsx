import React from "react";
import API from "./API";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import Snippets from "./Snippets"
import { Snippet } from "@nextui-org/react";
const page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-5">
      <div className="rounded-lg border border-solid p-2">
        <div className="text-center text-xl font-semibold ">API Support</div>
        <API user={user!} />
      </div>
      <div>
        <Snippets/>
      </div>
    </div>
  );
};

export default page;
