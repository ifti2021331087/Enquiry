import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LayoutDashboard, StickyNotePlus, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProblemAction } from "@/actions/user/userAction";
import { getAllUserAction } from "@/actions/admin/adminAction";



export default async function AdminDashboard() {
    const posts = await getAllProblemAction();
    const users = await getAllUserAction();
;    if(!users){
        return(
            <div>
                <p>
                    No users yet
                </p>
            </div>
        )
    }
    return (
        <div className="min-h-screen flex bg-zinc-50 font-sans dark:bg-black relative">
            <section className="basis-4/6 p-4 items-center">
                <div className="flex gap-2">
                    <div
                        className="rounded-2xl border border-zinc-200 bg-[#FCFCF9] p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
                    >
                        {/* 3. Uppercase, tracked-out label */}
                        <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                            Total Posts
                        </h3>

                        {/* 4. Large, bold primary metric */}
                        <div className="mt-3 text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                            {posts.length}
                        </div>
                    </div>
                    <div
                        className="rounded-2xl border border-zinc-200 bg-[#FCFCF9] p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
                    >
                        <h1 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                            Total Users
                        </h1>

                        <div className="mt-3 text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                            {users.length}
                        </div>
                    </div>
                    <div
                        className="rounded-2xl border border-zinc-200 bg-[#FCFCF9] p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
                    >
                        <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                            Solved Rate
                        </h3>

                        {/* TO-DO */}
                        <div className="mt-3 text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                            60.7%
                        </div>
                    </div>

                </div>
            </section>
            <section className="">

            </section>
        </div>
    )
}
