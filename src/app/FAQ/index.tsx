"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
export default function App() {
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
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="my-8 text-center text-4xl font-bold"
      >
        FAQ
      </motion.div>
      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <Accordion variant="splitted">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="What is UploadLoom?
"
          >
            UploadLoom is an Image hosting Platform but mainly it concerns for
            the devs,as it can be useful for them to host their assets online
            and can use it 24/7.UploadLoom makes the productivity of your
            developement a much easier as you don&apos;t need care about assets
            storage in your app.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="What are the Features specialized for devs?
"
          >
            An Integrated API support for your App will be provided along with a
            API_KEY and APP_ID to help you to host your app&apos;s Image Assets
            online.
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title="How many Apps can be created for an user?"
          >
            As of now,total of 3 Apps can be created per user.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 3"
            title="
How much Storage is available for each app?
"
          >
            For each app,you&apos;ll be provided with a 2GB Limit which can be
            also increased by Pro and Elite Membership.
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="Accordion 3"
            title="
What is Pro and Elite Membership?"
          >
            Pro: Pro membership can be applied for a single app which can be
            used to increase your App limit size from 2GB to 5GB limit. <br />
            Elite: Elite membership is a feature where you can connect with me
            if you need more than 3 apps or Need a gigs more than in Pro
            membership
          </AccordionItem>
          <AccordionItem
            key="6"
            aria-label="Accordion 3"
            title="Is there an analytics page for my app?
"
          >
            Yes,there will be an analytics page for your app which has the
            detailed statistics of <br />
            How many files have been uploaded? <br />
            How much storage have been exhausted? <br />
            Recent and Large file uploads
          </AccordionItem>
          <AccordionItem
            key="7"
            aria-label="Accordion 3"
            title="How the Premium Membership can be purchases?
"
          >
            Premium Memebership can be bought via Integrated Stripe Support on
            Credit/Debit cards.
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
}
