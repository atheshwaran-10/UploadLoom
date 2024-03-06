"use client";
import { App, User } from "@prisma/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
const Free = ({ user, app }: { user: User; app: App }) => {
  const [loading, setIsLoading] = useState(false);
  const isCurrentPlan = app.appLimit === 2048;
  return (
    <div>
      <div className="">
        <div className="flex justify-between">
          <div className="text-xl font-semibold">2GB App</div>
          {isCurrentPlan && (
            <Button
              className="text-slate-600"
              disabled={isCurrentPlan}
              variant="outline"
            >
              Current Plan
            </Button>
          )}
        </div>
        <div>Everything you need to start uploading!</div>
        <div className="my-3 text-sm text-slate-500">
          <div>- 2GB of storage *</div>
          <div>- Unlimited uploads and downloads</div>
          <div>- (Probably) cheaper than a cup of coffee</div>
        </div>
      </div>
    </div>
  );
};

export default Free;
