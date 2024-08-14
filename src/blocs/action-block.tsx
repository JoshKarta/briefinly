"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/constants/variants";

export default function ActionBlock() {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ duration: 1, delay: .25 }}
      className="container-screen relative flex w-full justify-center overflow-hidden px-4 dark:text-zinc-100 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 py-20 text-center">
        <h3 className="text-center text-2xl md:text-4xl font-bold">
          Write and share your letters now with the ones you love within just a
          few seconds!
        </h3>

        <p className="text-sm px-10 md:px-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo enim ut
          esse consequatur.
        </p>

        <Button
          className="group/modal-btn relative flex justify-center overflow-hidden"
          asChild
        >
          <Link href={"/dashboard"}>
            <span className="text-center transition duration-500 group-hover/modal-btn:translate-x-40">
              Get Started Now
            </span>
            <div className="absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0">
              📝
            </div>
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

export const DottedCircle = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "z-0 h-[300px] w-[300px] rounded-full bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]",
        className,
      )}
    ></div>
  );
};
