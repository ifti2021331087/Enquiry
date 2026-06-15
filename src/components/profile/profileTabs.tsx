

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'
import LikeButton from '../feed/likeButton'
import { Check, MessageCircleReply, ThumbsUp } from 'lucide-react'
import { getRepliesByIdAction } from '@/actions/user/userAction'
interface profileProps {
    problems: {
        id: string,
        title: string,
        description: string | null,
        tags: string[] | null,
        createdAt: Date,
        replyCount: number,
        isSolved: boolean
    }[]
    ,
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
        <div>
            <Tabs defaultValue="problems">
                <TabsList variant="line">
                    <TabsTrigger value="problems" >Problems</TabsTrigger>
                    <TabsTrigger value="replies">Replies</TabsTrigger>
                </TabsList>
                <TabsContent value="problems" className='flex flex-col gap-4'>
                    {
                        problems.length == 0 && (
                            <div className='mt-5'>
                                No problems to show
                            </div>
                        )
                    }
                    {
                        problems.map(problem => {
                            return (
                                <div key={problem.id} className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col gap-4">

                                    <div className="flex w-full flex-wrap justify-start gap-2">
                                        {
                                            problem.tags && (
                                                problem.tags.map((tag) => (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 font-medium px-2.5 py-0.5"
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))
                                            )
                                        }
                                    </div>

                                    <div className="space-y-1.5 flex-1">
                                        <Link href={`/problem/${problem.id}`} className="group block">
                                            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {problem.title}
                                            </h1>
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 h-9 px-3 border border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            >
                                                <MessageCircleReply className="w-4 h-4 mr-2 opacity-70" />
                                                <span>{problem.replyCount}</span>
                                                <span className="sr-only sm:not-sr-only sm:ml-1">replies</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </TabsContent>
                <TabsContent value="replies">
                    {
                        replies.length == 0 && (
                            <div className='mt-5'>
                                No replies to show
                            </div>
                        )
                    }
                    {
                        replies.map((reply, index) => {

                            return (
                                <div
                                    key={reply.id}
                                    className={`flex flex-col gap-3 transition-colors ${reply.isApproved
                                        ? "p-5 rounded-xl bg-emerald-50/50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900"
                                        : `p-4 border-b border-gray-100 dark:border-gray-800 ${index === replies.length - 1 ? 'border-b-0' : ''}`
                                        }`}
                                >
                                    {reply.isApproved && (
                                        <div className="flex items-center mb-1">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
                                                <Check className="w-3.5 h-3.5" />
                                                Accepted answer
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-start justify-between gap-4">
                                        {/* Avatar & Content Area */}
                                        <div className="flex gap-3 w-full">

                                            <div className="flex flex-col gap-1 w-full">
                                                <Link href={`/problem/${reply.parentProblem?.id}` || ""} className="group block">
                                                    <h1 className="text-md font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                        {reply.parentProblem?.title || "Deleted Problem"}
                                                    </h1>
                                                </Link>
                                                <div className="flex justify-between gap-1.5">
                                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px] mt-1 whitespace-pre-wrap">
                                                        {reply.description}
                                                    </p>
                                                    <span className="text-gray-500 text-xs font-medium">
                                                        {getTimeAgo(reply.createdAt)}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}
