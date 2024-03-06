import React from "react";
import { Snippet } from "@nextui-org/react";
import { User } from "@prisma/client";
const API = ({ user, appId }: { user: User; appId: string }) => {
  return (
    <div>
      <div className="mt-6 flex flex-row gap-x-3">
        <h2 className="mt-1">Your API key</h2>
        <Snippet className="" hideSymbol>
          {user.id}
        </Snippet>
      </div>
      <div className="mt-6 flex flex-row gap-x-3">
        <h2 className="mt-1">Your APP ID</h2>
        <Snippet className="" hideSymbol>
          {appId}
        </Snippet>
      </div>
    </div>
  );
};

export default API;
