import { App, User } from "@prisma/client";
import React from "react";

export default function Card1({ user,app }: { user: User,app:App }) {
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
    <div className="flex flex-row justify-between rounded-lg border border-solid border-slate-400">
      <div className="m-6">
        <div className="text-xl font-semibold">Current Plan</div>
        <div>Manage and view your current plan</div>
      </div>
      <div className="m-6">
        <div className="text-lg font-semibold">{userTier}</div>
        <div className="text-md">{desc}</div>
      </div>
    </div>
  );
}
