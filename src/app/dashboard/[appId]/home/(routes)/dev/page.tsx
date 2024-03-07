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
      <div className="m-6  rounded-lg border border-solid p-2">
        <API user={user!} appId={params.appId} />
      </div>
      <div className="m-6  rounded-lg border border-solid hidden md:block lg:block xl:block 2xl:block">
        <Snippets />
      </div>
    </div>
  );
};

export default page;
