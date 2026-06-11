"use client";

import { MessageCircleQuestionMark, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import UserMenu from "../auth/user-menu";
import { useSession } from "@/lib/auth-client";

export default function Header() {
    const { data: session, isPending } = useSession()
    const user = session?.user;
    const isAdmin = user?.role === 'admin';
    const pathName = usePathname();
    const isAuthPage: boolean = (pathName === "/auth/signIn") || (pathName === "/auth/signUp");
    if (isAuthPage) return null
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
            <div className="container mx-auto h-16 flex items-center justify-between px-4">

                {/* Left Side: Logo */}
                <div className="flex items-center gap-2">
                    <Link href={"/"} className="flex gap-2 items-center">
                        <div className="rounded-md">
                            <MessageCircleQuestionMark className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="font-bold text-xl text-blue-500 hover:text-blue-600">
                            Enquiry
                        </span>
                    </Link>
                </div>

                {/* Center: Desktop Navigation Links (Hidden on Mobile) */}
                <nav className="hidden md:flex items-center gap-6">
                    {
                        !isPending && !isAdmin && (
                            <>
                                <Link href={"/"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Feed
                                </Link>
                                <Link href={"/ask"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Ask
                                </Link>
                                <Link href={"/profile"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Profile
                                </Link>
                                <Link href={"/notifications"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Notifications
                                </Link>
                            </>
                        )
                    }
                    {
                        !isPending && isAdmin && (
                            <>
                                <Link href={"/"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Home
                                </Link>
                                <Link href={"/admin/dashboard"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Dashboard
                                </Link>
                                <Link href={"/admin/post"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Posts
                                </Link>
                                <Link href={"/admin/user"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    Users
                                </Link>
                            </>
                        )
                    }
                </nav>

                {/* Right Side: Profile Dropdown (Desktop) & Hamburger Menu (Mobile) */}
                <div className="flex items-center gap-2">

                    {/* Profile Dropdown */}
                    <UserMenu></UserMenu>

                    {/* Mobile Menu Drawer (Hidden on Desktop) */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <MenuIcon className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                                <SheetHeader className="text-left border-b pb-4">
                                    <SheetTitle className="flex items-center gap-2">
                                        <MessageCircleQuestionMark className="w-5 h-5 text-blue-500" />
                                        <span className="text-blue-500 font-bold">Enquiry</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-4 mt-6">
                                    {
                                        !isPending && !isAdmin && (
                                            <>
                                                <Link href={"/"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Feed
                                                </Link>
                                                <Link href={"/ask"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Ask
                                                </Link>
                                                <Link href={"/profile"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Profile
                                                </Link>
                                                <Link href={"/notifications"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Notifications
                                                </Link>
                                            </>
                                        )
                                    }
                                    {
                                        !isPending && isAdmin && (
                                            <>
                                                <Link href={"/"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Home
                                                </Link>
                                                <Link href={"/admin/dashboard"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Dashboard
                                                </Link>
                                                <Link href={"/admin/post"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Posts
                                                </Link>
                                                <Link href={"/admin/user"} className="font-medium text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                    Users
                                                </Link>
                                            </>
                                        )
                                    }
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </div>
        </header>
    );
}