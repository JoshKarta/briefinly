"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { LayoutDashboard } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 0);
    };

    handleScroll()
    window.addEventListener("scroll", handleScroll);

    setIsMounted(true)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 ${isScrolled && "border-b dark:border-black/50 backdrop-blur-md shadow-sm"}`}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href={'/'} className="hover:scale-95 hover-effect hover:rotate-0 -rotate-6">
              <Image src={'/briefinly-favicon.png'} alt="logo" height={45} width={45} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isMounted ?
              <div className="flex items-center justify-center gap-2">
                <SignedOut>
                  <Button asChild>
                    <SignInButton />
                  </Button>

                  <Button
                    asChild
                    variant={"secondary"}
                    className="hidden md:inline-block"
                  >
                    <SignUpButton />
                  </Button>
                </SignedOut>

                <ModeToggle />
                <SignedIn>
                  <Button asChild size={"icon"}>
                    <Link href={'/dashboard'}>
                      <LayoutDashboard />
                    </Link>
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div> : <div className="sm:flex sm:gap-4">
                <Skeleton className="w-20 h-10" />
                <Skeleton className="w-20 h-10 hidden md:inline-block" />
              </div>
            }


          </div>
        </div>
      </div>
    </header>
  );
}
