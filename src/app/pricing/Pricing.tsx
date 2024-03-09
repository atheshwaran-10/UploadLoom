"use client";
import React, { useEffect } from "react";
import PriceCard, { PriceCardProps } from "./PriceCard";
import { AnimatePresence, motion, useInView } from "framer-motion";

const plans: PriceCardProps[] = [
  {
    title: "2GB App",
    desc: "Everything you need to start uploading!",
    price: "0",
    isCustom: false,
    buttonText: "Get Started",
    buttonRoute: "/dashboard",
    isRecommended: false,
    features: [
      "2GB of storage *",
      "Unlimited uploads and downloads",
      "(Probably) cheaper than a cup of coffee",
    ],
  },
  {
    title: "5GB App",
    desc: "For those with more than 2 gigs of files",
    price: "200",
    isCustom: false,
    buttonText: "Upgrade Now",
    buttonRoute: "/dashboard",
    isRecommended: true,
    features: [
      "5GB of storage *",
      "Unlimited uploads and downloads",
      "Geared towards more active users",
    ],
  },
  {
    title: "Unlimited App(s)",
    desc: "Everything you need to start uploading!",
    price: "0",
    isCustom: true,
    buttonText: "Schedule a call",
    buttonRoute: "https://cal.com/atheshwaran",
    isRecommended: false,
    features: [
      "Unlimited Gigs of storage *",
      "Unlimited uploads and downloads",
      "Tailored for extensive data requirements",
    ],
  },
];

const Pricing = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      initial="hidden"
      className="w-full"
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
      <motion.div id="price_header" variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <div className="my-8 text-center text-4xl font-bold ">
          Plans and Pricing
        </div>
      </motion.div>
      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <div className="mb-6  grid grid-cols-1 gap-5 px-12 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-3">
          {plans.map((plan, index) => (
            <PriceCard
              key={index}
              title={plan.title}
              desc={plan.desc}
              price={plan.price}
              isCustom={plan.isCustom}
              buttonText={plan.buttonText}
              buttonRoute={plan.buttonRoute}
              isRecommended={plan.isRecommended}
              features={plan.features}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Pricing;
