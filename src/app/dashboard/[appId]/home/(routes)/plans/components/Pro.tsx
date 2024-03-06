"use client";
import { App, User } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
const Pro = ({ user, app }: { user: User; app:  App }) => {
  const isCurrentPlan = app.appLimit === 5120;
  const [loading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      if (!user) {
        toast.error("You are required to Login to enroll the course");
      }

      setIsLoading(true);
      const response = await axios.post(`/api/${app.id}/purchase`);
      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="">
        <div className="flex justify-between">
          <div className="text-xl font-semibold">Pro App</div>
          {isCurrentPlan ? (
            <Button
              className="text-slate-600"
              disabled={isCurrentPlan}
              variant="outline"
            >
              Current Plan
            </Button>
          ) : (
            <Button
              onClick={onClick}
              className="bg-purple-400/20 font-semibold text-purple-500 hover:bg-purple-400/20"
            >
              Switch to paid
            </Button>
          )}
        </div>
        <div>
          Suitable for individuals or small businesses requiring additional
          storage!
        </div>
        <div className="my-3 text-sm text-slate-500">
          <div>- 5GB of storage *</div>
          <div>- Unlimited uploads and downloads</div>
          <div>- Geared towards more active users</div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
