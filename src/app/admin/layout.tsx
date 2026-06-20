import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LayoutDashboard, StickyNotePlus, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50/30 dark:bg-zinc-950 font-sans relative">
            
            {/* Desktop Sidebar - Hidden on mobile, fixed width on desktop */}
            <aside className="hidden md:flex w-56 lg:w-64 flex-shrink-0 sticky top-16 self-start flex-col py-8 px-4 gap-y-1.5 border-r border-zinc-200 dark:border-zinc-800 min-h-[calc(100vh-4rem)] bg-white dark:bg-zinc-950 z-10 shadow-[1px_0_20px_-15px_rgba(0,0,0,0.1)] dark:shadow-none">
                
                <Label className="py-2 px-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Admin Panel
                </Label>
                
                <Button variant="ghost" className="justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 transition-colors rounded-lg h-10" asChild>
                    <Link href={"/admin/dashboard"} className="flex items-center gap-3">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                </Button>
                
                <Button variant="ghost" className="justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 transition-colors rounded-lg h-10" asChild>
                    <Link href={"/admin/post"} className="flex items-center gap-3">
                        <StickyNotePlus className="w-4 h-4" />
                        Posts
                    </Link>
                </Button>
                
                <Button variant="ghost" className="justify-start hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 transition-colors rounded-lg h-10" asChild>
                    <Link href={"/admin/user"} className="flex items-center gap-3">
                        <Users className="w-4 h-4" />
                        Users
                    </Link>
                </Button>
                
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full min-w-0">
                {/* 
                  Added a max-width container with responsive padding. 
                  This stops the tables from stretching infinitely on ultra-wide monitors 
                  and gives them nice breathing room away from the sidebar.
                */}
                <div className="max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 lg:p-10 w-full">
                    {children}
                </div>
            </main>

        </div>
    )
}