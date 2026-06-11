

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LayoutDashboard, StickyNotePlus, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-zinc-50 font-sans dark:bg-black relative">
            <section className="basis-1/6 sticky top-24 self-start flex flex-col items-stretch mt-8 px-4 gap-y-2">
                <Label className="py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Browse
                </Label>
                {/* Added justify-start so the button text aligns left like a typical sidebar */}
                <Button variant="outline" className="justify-start" asChild><Link href={"/admin/dashboard"}><LayoutDashboard />Dashboard</Link></Button>
                <Button variant="outline" className="justify-start" asChild><Link href={"/admin/post"}><StickyNotePlus />Posts</Link></Button>
                <Button variant="outline" className="justify-start" asChild><Link href={"/admin/user"}><Users />Users</Link></Button>
            </section>
            <section className="border-l-2 basis-5/6 p-6 flex flex-col items-stretch justify-start w-full">
                {children}
            </section>

        </div>
    )
}
