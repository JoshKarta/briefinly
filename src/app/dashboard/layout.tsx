import { Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/Themeprovider";
import { Metadata } from "next";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { HomeIcon, LayoutDashboard, Mail } from "lucide-react";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Dashboard from "./dashboard";


const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
    title: "Briefinly Dashboard",
    description: "Generated by create next app & supabase",
};

const navLinks = [
    {
        text: 'Home',
        url: '/dashboard',
        icon: HomeIcon
    },
    {
        text: 'Letters',
        url: '/dashboard/letters',
        icon: Mail
    }
]

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/briefinly-favicon.png" sizes="any" />
            <body className={poppins.className}>
                <ConvexClientProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system">
                        <Toaster richColors position="top-center" />
                        {/* <div className="flex min-h-screen w-full bg-muted/40 dark:bg-neutral-800">

                            <SideBar />
                            <div className="flex flex-1 flex-col sm:gap-4 sm:pl-14">
                                <Header />
                                <main className="flex-1 my-4 sm:mt-0 p-4 bg-white dark:bg-neutral-700 dark:text-zinc-100 mx-4 rounded-lg">
                                    {children}
                                </main>
                            </div>
                        </div> */}
                        <Dashboard>
                            {children}
                        </Dashboard>
                    </ThemeProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}


function SideBar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r dark:border-r-neutral-700 bg-background dark:bg-black sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Link
                        target="_blank"
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        prefetch={false}
                    >
                        <LayoutDashboard className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Dashboard</span>
                    </Link>
                    {navLinks.map((item) => (
                        <Tooltip key={item.url}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.url}
                                    className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8")}
                                    prefetch={false}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="sr-only">{item.text}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.text}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>
        </aside>
    )
}

function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background dark:bg-black dark:text-zinc-100 dark:!border-b-white px-4 sm:static sm:border-0 sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs dark:bg-black dark:border-neutral-500 dark:!text-zinc-100">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            rel="_blank"
                            href="/"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            prefetch={false}
                        >
                            <LayoutDashboard className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Dashboard</span>
                        </Link>

                        {navLinks.map((item) => (
                            <Link href={item.url} key={item.url} className="dark:text-zinc-100 flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                                <item.icon className="h-5 w-5" />
                                {item.text}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex-1">
                <Link href={'/dashboard'} className="flex items-center gap-2">
                    <Image src={'/briefinly-favicon.png'} alt="logo" height={30} width={30} className="hidden sm:inline-block" />
                    <p className="text-lg font-medium">Briefinly Dashboard</p>
                </Link>
            </div>
            <div className="flex items-center gap-2 mr-2">
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    )
}