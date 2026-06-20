import { getRepliesByIdAction } from '@/actions/user/userAction';
import { Label } from '../ui/label';
import ReplyApproveButton from './replyApproveButton';
import { Check, MessageCircle } from 'lucide-react';
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";

function getTimeAgo(date: Date | string) {
    // ... keep your existing getTimeAgo logic ...
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

function getInitials(name: string) {
    // ... keep your existing getInitials logic ...
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

export default async function ReplyShowingCard({ problemId }: { problemId: string }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const currentUserId = session?.user?.id;
    const replies = await getRepliesByIdAction(problemId);

    if (!Array.isArray(replies)) {
        return <div className="bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 text-red-500 text-sm shadow-sm">Failed to load replies.</div>;
    }

    return (
        <div className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden'>
            
            {/* Header */}
            <div className="flex items-center gap-2 px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
                <MessageCircle className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
                </h3>
            </div>
            
            {replies.length === 0 ? (
                <div className="text-zinc-500 dark:text-zinc-400 text-sm p-10 text-center flex flex-col items-center justify-center">
                    <p>No replies yet. Be the first to help out!</p>
                </div>
            ) : (
                <div className="flex flex-col">
                    {replies.map((row, index) => {
                        const replyData = row.reply;
                        const problemOwnerId = row.problem?.userId;
                        const isProblemOwner = currentUserId === problemOwnerId;
                        const isApproved = replyData.isApproved;

                        return (
                            <div 
                                key={replyData.id} 
                                className={`flex flex-col gap-3 transition-colors ${
                                    isApproved 
                                        ? "p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/50" 
                                        : `p-6 border-b border-zinc-100 dark:border-zinc-800/80 ${index === replies.length - 1 ? 'border-b-0' : ''}`
                                }`}
                            >
                                {/* The Badge */}
                                {isApproved && (
                                    <div className="flex items-center mb-1">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/60 shadow-sm">
                                            <Check className="w-3.5 h-3.5" />
                                            Accepted answer
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between gap-4">
                                    {/* Avatar & Content */}
                                    <div className="flex gap-3 sm:gap-4 w-full">
                                        <div className="w-10 h-10 mt-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200 dark:border-blue-800/50">
                                            {getInitials(replyData.name)}
                                        </div>

                                        <div className="flex flex-col gap-1 w-full min-w-0">
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                                                    {replyData.name}
                                                </span>
                                                <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700 font-medium">·</span>
                                                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">
                                                    {getTimeAgo(replyData.createdAt)}
                                                </span>
                                            </div>

                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[15px] mt-1 whitespace-pre-wrap break-words">
                                                {replyData.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Area */}
                                    <div className="shrink-0 ml-2">
                                        {isProblemOwner && (
                                            <ReplyApproveButton 
                                                replyId={replyData.id} 
                                                initialApproved={replyData.isApproved} 
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}