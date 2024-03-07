"use client";
import { App, User } from "@prisma/client";
import React, { useState } from "react";
import Pro from "./Pro";
import Free from "./Free";
import Elite from "./Elite";
import toast from "react-hot-toast";
import axios from "axios";

export default function Card2({ user, app }: { user: User; app: App }) {
  const appLimit = app.appLimit;
  const userTier =
    appLimit === 2048
      ? "Free (2GB)"
      : appLimit === 5120
        ? "Pro (5GB)"
        : appLimit > 5120
          ? `Elite (${appLimit / 1024}GB)`
          : "Guest";
  const desc =
    userTier === "Free (2GB)"
      ? "Basic access for temporary users or guests"
      : userTier === "Pro (5GB)"
        ? "More space, still budget-friendly"
        : userTier.startsWith("Elite")
          ? "Tailored for heavy users, ample space"
          : "Basic access for temporary users or guests";

  return (
    <div className="flex flex-col justify-between rounded-lg border border-solid border-slate-400 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
      <div className="m-6">
        <div className="text-xl font-semibold">Available Plans</div>
        <div>View available plans and change subscription</div>
      </div>
      <div className="m-6">
        <div className="flex flex-col gap-y-6">
          <Free user={user} app={app} />
          <Pro user={user} app={app} />
          <Elite user={user} app={app} />
        </div>
      </div>
    </div>
  );
}
