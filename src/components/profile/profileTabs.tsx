import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Check, MessageCircleReply, FileQuestion, ArrowRight } from 'lucide-react'

interface profileProps {
    problems: {
        id: string,
        title: string,
        description: string | null,
        tags: string[] | null,
        createdAt: Date,
        replyCount: number,
        isSolved: boolean
    }[],
    replies: {
        id: string,
        description: string | null,
        isApproved: boolean,
        createdAt: Date,
        parentProblem: {
            id: string,
            title: string,
            tags: string[] | null
        } | null
    }[]
}

function getTimeAgo(date: Date | string) {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();

    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
}

export default async function ProfileTabs({ problems, replies }: profileProps) {
    return (
        <div className="w-full">
            <Tabs defaultValue="problems" className="w-full">
                
                {/* Tabs Header */}
                <div className="border-b border-zinc-200 dark:border-zinc-800 mb-6">
                    <TabsList className="bg-transparent h-12 p-0 w-full justify-start gap-6">
                        <TabsTrigger 
                            value="problems" 
                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-500 rounded-none h-full px-2 font-semibold text-zinc-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-none"
                        >
                            Problems ({problems.length})
                        </TabsTrigger>
                        <TabsTrigger 
                            value="replies" 
                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-500 rounded-none h-full px-2 font-semibold text-zinc-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-none"
                        >
                            Replies ({replies.length})
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Problems Content */}
                <TabsContent value="problems" className='flex flex-col gap-4 animate-in fade-in duration-300'>
                    {problems.length === 0 ? (
                        <EmptyState icon={<FileQuestion className="w-8 h-8" />} message="No problems posted yet." />
                    ) : (
                        problems.map(problem => (
                            <Link href={`/problem/${problem.id}`} key={problem.id} className="group block">
                                <div className="w-full bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col gap-3">
                                    
                                    <div className="flex w-full flex-wrap items-center justify-between gap-2">
                                        <div className="flex flex-wrap gap-2">
                                            {problem.tags && problem.tags.map((tag) => (
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 font-medium px-2.5 py-0.5 border-transparent"
                                                    key={tag}
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                                            {getTimeAgo(problem.createdAt)}
                                        </span>
                                    </div>

                                    <h1 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                        {problem.title}
                                    </h1>

                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                            <MessageCircleReply className="w-4 h-4 mr-1.5 opacity-70" />
                                            <span>{problem.replyCount}</span>
                                            <span className="ml-1 hidden sm:inline">replies</span>
                                        </div>
                                        {problem.isSolved && (
                                            <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-500">
                                                <Check className="w-4 h-4 mr-1" />
                                                <span>Solved</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </TabsContent>

                {/* Replies Content */}
                <TabsContent value="replies" className='flex flex-col gap-4 animate-in fade-in duration-300'>
                    {replies.length === 0 ? (
                        <EmptyState icon={<MessageCircleReply className="w-8 h-8" />} message="No replies posted yet." />
                    ) : (
                        replies.map((reply) => (
                            <div
                                key={reply.id}
                                className={`flex flex-col gap-4 p-5 sm:p-6 rounded-xl transition-all shadow-sm ${
                                    reply.isApproved
                                        ? "bg-emerald-50/50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/60"
                                        : "bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800"
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                    <Link href={`/problem/${reply.parentProblem?.id || ""}`} className="group inline-flex items-start gap-2">
                                        <ArrowRight className="w-4 h-4 mt-1 text-zinc-400 group-hover:text-blue-500 shrink-0" />
                                        <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {reply.parentProblem?.title || "Deleted Problem"}
                                        </h1>
                                    </Link>
                                    
                                    {reply.isApproved && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/60 shrink-0 w-fit">
                                            <Check className="w-3 h-3" />
                                            Accepted
                                        </span>
                                    )}
                                </div>

                                <div className="pl-6 border-l-2 border-zinc-100 dark:border-zinc-800 ml-1.5">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[15px] whitespace-pre-wrap line-clamp-3">
                                        {reply.description}
                                    </p>
                                    <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium mt-3">
                                        Replied {getTimeAgo(reply.createdAt)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

// Sub-component for empty states
function EmptyState({ icon, message }: { icon: React.ReactNode, message: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="text-zinc-400 dark:text-zinc-500 mb-3">
                {icon}
            </div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{message}</p>
        </div>
    )
}