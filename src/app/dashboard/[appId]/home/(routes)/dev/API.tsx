import React from "react";
import { Snippet } from "@nextui-org/react";
import { User } from "@prisma/client";
const API = ({ user }: { user: User }) => {
  return (
    <div className="mt-6 flex flex-row gap-x-3">
      <h2 className="mt-1">Your API key</h2>
      <Snippet>{user.id}</Snippet>
    </div>
  );
};

export default API;
