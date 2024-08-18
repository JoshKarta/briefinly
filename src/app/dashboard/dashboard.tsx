"use client";
import React, { ReactNode, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconBrandTabler,
    IconMail,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";

export default function Dashboard({ children }: { children: ReactNode }) {
    const { user } = useUser()
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Letters",
            href: "/dashboard/letters",
            icon: (
                <IconMail className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "#",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },

    ];

    const [open, setOpen] = useState(false);

    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(segment => segment !== '')

    return (
        <div
            className={cn(
                "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "min-h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 h-screen">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="hidden md:inline-block">
                            <ModeToggle />
                        </div>
                        <SidebarLink
                            link={{
                                label: user?.username as string,
                                href: "#",
                                icon: (
                                    <UserButton afterSignOutUrl="/" />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Breadcrumb className="md:hidden px-4 mb-2">
                <BreadcrumbList className="text-zinc-400">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {pathSegments.map((segment, index) => {
                        const href = `/${pathSegments.slice(0, index + 1).join('/')}`
                        const isLast = index === pathSegments.length - 1

                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="text-zinc-100">{segment}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={href}>
                                            {segment}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator />}
                            </React.Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>

            <DashboardContent>
                {children}
            </DashboardContent>
        </div>
    );
}

export const Logo = () => {
    return (
        <div
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image src={'/briefinly-favicon.png'} alt="logo" width={20} height={20} />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Briefinly
            </motion.span>
        </div>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image src={'/briefinly-favicon.png'} alt="logo" width={20} height={20} />

        </Link>
    );
};

const DashboardContent = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-1">
            <div className="p-4 md:p-8 rounded-t-2xl md:rounded-tr-none  md:rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-screen">
                {children}
            </div>
        </div>
    );
};