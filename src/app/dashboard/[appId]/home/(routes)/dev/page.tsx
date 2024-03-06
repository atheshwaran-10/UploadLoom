import React from "react";
import API from "./API";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import Header from "./Header";
import Snippets from "./Snippets";
const page = async ({params}:{params:{appId:string}}) => {
  const user = await getCurrentUser();
  return (
    <div className=" gap-y-5">
      <Header />
      <div className="m-12 w-1/2 rounded-lg border border-solid p-2">
        <API user={user!} appId={params.appId} />
      </div>
      <div className="m-12  rounded-lg border border-solid">
        <Snippets />
      </div>
    </div>
  );
};

export default page;
