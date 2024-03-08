"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import style from "./hero.module.css";
import { cn } from "@/lib/utils";
import Background from "../background";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function HeroSection({ signedIn }: { signedIn: boolean }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;
  const router = useRouter();

  const socialAction = (action: string) => {
    signIn(action, { redirect: true }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid credentials!");
      }
      if (callback?.status === 200) {
        toast.success("Login Successfull");
        router.push("/dashboard");
      }

      if (callback?.ok) {
        toast.success("Login Successfull");
        router.push("/dashboard");
      }
    });
  };

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="mx-auto mt-1 max-w-full px-6 md:mt-3 lg:px-8 ">
      <div className="mx-auto"></div>
      <div className="mx-auto max-w-full text-center">
        <motion.div
          initial="hidden"
          className="max-w-2xl"
          ref={ref}
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="font-headingAlt space-x-4 text-5xl font-bold tracking-tight sm:text-7xl"
          >
            <span className={cn(style.magicText)}>
              Loom Files <br />
            </span>
            <span className="md:mx-[2px]">from anywhere</span>
          </motion.h1>
          <motion.p
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-6 text-lg font-semibold leading-8 "
          >
            Upload Loom is a platform where you can upload your files for more
            productive development
          </motion.p>

          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-10 flex items-center justify-center gap-x-6 "
          >
            {!signedIn ? (
              <Button
                className="bg-purple-600 font-semibold text-white hover:bg-purple-800"
                onClick={() => socialAction("discord")}
              >
                Get started
              </Button>
            ) : (
              <Link href="/dashboard" className="z-50">
                <Button className="bg-purple-600 font-semibold text-white hover:bg-purple-800">
                  Get started
                </Button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
      <div className="-z-[100] mx-auto flex items-center justify-center">
        <Background />
      </div>
      <div className="mt-16 flow-root sm:mt-24">
        <motion.div
          className="rounded-md"
          initial={{ y: 100, opacity: 0 }} // Image starts from 100px below and fully transparent
          animate={{ y: 0, opacity: 1 }} // Image ends at its original position and fully opaque
          transition={{ type: "spring", stiffness: 50, damping: 20 }} // transition specifications
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            ></motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
