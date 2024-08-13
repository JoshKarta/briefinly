import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function ActionBlock() {
  return (
    <div className="container-screen relative px-4 dark:text-zinc-100 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 text-center">
        <h3 className="text-center text-3xl font-bold">
          Write and share your letters now with the ones you love within just a
          few seconds!
        </h3>

        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo enim ut
          esse consequatur.
        </p>

        <Button
          className="group/modal-btn relative flex justify-center overflow-hidden"
          asChild
        >
          <Link href={"/dashboard"}>
            <span className="text-center transition duration-500 group-hover/modal-btn:translate-x-40">
              Get Stared Now
            </span>
            <div className="absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0">
              📝
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}

const DottedCircle = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "h-[300px] w-[300px] bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]",
        className,
      )}
    ></div>
  );
};
