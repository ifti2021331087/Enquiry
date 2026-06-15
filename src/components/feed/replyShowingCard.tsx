import { getRepliesByIdAction } from '@/actions/user/userAction';
import { Label } from '../ui/label';
import ReplyApproveButton from './replyApproveButton';
import { Check } from 'lucide-react';
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";

// Helpers
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

function getInitials(name: string) {
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
        return <div className="text-red-500 text-sm">Failed to load replies.</div>;
    }

    if (replies.length === 0) {
        return <div className="text-muted-foreground text-sm p-4 text-center">No replies yet. Be the first!</div>;
    }

    return (
        <div className='rounded-md w-full space-y-4 p-6'>
            <div className="flex items-center gap-2 mb-2">
                <Label className="text-base font-semibold">{replies.length} Replies</Label>
            </div>
            
            {replies.map((row, index) => {
                const replyData = row.reply;
                const problemOwnerId = row.problem?.userId;
                const isProblemOwner = currentUserId === problemOwnerId;
                const isApproved = replyData.isApproved;

                return (
                    <div 
                        key={replyData.id} 
                        // 1. DYNAMIC STYLING: Applies the green box if approved, otherwise just a standard bottom border
                        className={`flex flex-col gap-3 transition-colors ${
                            isApproved 
                                ? "p-5 rounded-xl bg-emerald-50/50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900" 
                                : `p-4 border-b border-gray-100 dark:border-gray-800 ${index === replies.length - 1 ? 'border-b-0' : ''}`
                        }`}
                    >
                        {/* 2. THE BADGE: Only shows up at the top if it is approved */}
                        {isApproved && (
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
                                <div className="w-9 h-9 mt-0.5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                                    {getInitials(replyData.name)}
                                </div>

                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                                            {replyData.name}
                                        </span>
                                        <span className="text-gray-400 font-medium">·</span>
                                        <span className="text-gray-500 text-xs font-medium">
                                            {getTimeAgo(replyData.createdAt)}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px] mt-1 whitespace-pre-wrap">
                                        {replyData.description}
                                    </p>
                                </div>
                            </div>

                            {/* 3. ACTION AREA: Only the Problem Owner sees the toggle button */}
                            <div className="shrink-0">
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
    );
}