import { App, User } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
const Elite = ({ user,app }: { user: User,app:App }) => {
  const isCurrentPlan = app.appLimit > 5120;
  return (
    <div>
      <div className="">
        <div className="flex justify-between">
          <div className="text-xl font-semibold">Unlimited App</div>
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
              className="bg-purple-400/20 font-semibold text-purple-500 hover:bg-purple-400/20"
            >
              Schedule a call
            </Button>
          )}
        </div>
        <div>Suitable for demanding tasks and large-scale projects!</div>
        <div className="my-3 text-sm text-slate-500">
          <div>- Unlimited Gigs of storage *</div>
          <div>- Unlimited uploads and downloads</div>
          <div>
            - Tailored for power users or organizations with extensive data
            requirements
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elite;
