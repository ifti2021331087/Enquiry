import Image from "next/image";
import { Badge } from "../ui/badge";
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";
import { CalendarDays, User } from "lucide-react";

interface props {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    tags: string[] | null;
    userId: string;
    authorName: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export default async function ProblemDetails({ problem }: { problem: props }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const fullName = problem.authorName || "Anonymous User";
    const nameParts = fullName.trim().split(" ");
    const surname = nameParts.length > 1 ? nameParts.pop() : nameParts[0];
    
    const formatedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    }).format(new Date(problem.createdAt))
    
    return (
        <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm flex flex-col gap-6">
            
            {/* Header: Tags & Title */}
            <div className="flex flex-col gap-4">
                {problem.tags && problem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 border-transparent">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
                    {problem.title}
                </h1>
            </div>

            {/* Author & Date Meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                        <User className="w-4 h-4" />
                    </div>
                    {fullName}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <CalendarDays className="w-4 h-4" />
                    {formatedDate}
                </div>
            </div>

            {/* Description */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {problem.description}
                </p>
            </div>

            {/* Image (Fixed height scaling) */}
            {problem.fileUrl && (
                <div className="relative w-full aspect-video rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden mt-2">
                    <Image 
                        src={problem.fileUrl} 
                        alt="Problem attached file" 
                        fill 
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}
        </article>
    )
}