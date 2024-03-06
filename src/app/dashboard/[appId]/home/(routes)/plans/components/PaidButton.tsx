"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface PayProps {
  user?: User | null;
  price: number;
  appId: string;
}

export const PayButton = ({
  user,
  price,
  appId,
}: PayProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      if ( !user) {
        toast.error("You are required to Login to enroll the course");
        return router.push("/login");
      }
      if (!user.emailVerified) {
        toast.error("Please verify your email address");
        return router.push("/login/verify");
      }
      setIsLoading(true);
      const response = await axios.post(`/api/${appId}/purchase`);
      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Button
        onClick={onClick}
        disabled={isLoading}
        size="sm"
        className="w-full "
      >
        Enroll for {formatPrice(price)}
      </Button>
    </div>
  );
};

export default PayButton;