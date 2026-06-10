

// import { getRepliesByIdAction } from '@/actions/user/userAction';
// import { Badge } from '../ui/badge';


// export default async function ReplyShowingCard({ problemId }: { problemId: string }) {

//     const replies = await getRepliesByIdAction(problemId);
//     console.log(replies);
//     if (!Array.isArray(replies)) {
//         return <div className="text-red-500 text-sm">Failed to load replies.</div>;
//     }
//     return (
//         <div className='border border-blue-400 rounded-md w-full space-y-4 p-4 '>
//             {
//                 replies && replies.map((reply) => (
//                     <div key={reply.reply.id}>
//                         <Badge></Badge>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

import { getRepliesByIdAction } from '@/actions/user/userAction';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

// Helper to calculate "45m ago", "2h ago", etc.
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

// Helper to get initials (e.g., "John Doe" -> "JD")
function getInitials(name: string) {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

export default async function ReplyShowingCard({ problemId }: { problemId: string }) {

    const replies = await getRepliesByIdAction(problemId);
    
    if (!Array.isArray(replies)) {
        return <div className="text-red-500 text-sm">Failed to load replies.</div>;
    }

    if (replies.length === 0) {
        return <div className="text-muted-foreground text-sm p-4 text-center">No replies yet. Be the first!</div>;
    }

    return (
        <div className='border border-blue-400 rounded-md w-full space-y-6 p-6'>
            <Label>{replies.length} replies</Label>
            {replies.map((row) => {
                // Assuming Drizzle is nesting your data under 'reply' because of joins
                const replyData = row.reply; 
                
                return (
                    <div key={replyData.id} className="flex items-start gap-4">
                        
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm shrink-0">
                            {getInitials(replyData.name)}
                        </div>

                        {/* Content Area */}
                        <div className="flex flex-col gap-1 w-full">
                            
                            {/* Header: Name and Time */}
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-gray-900 dark:text-gray-100 text-[15px]">
                                    {replyData.name}
                                </span>
                                <span className="text-gray-500 font-medium px-1">·</span>
                                <span className="text-gray-500 text-sm">
                                    {getTimeAgo(replyData.createdAt)}
                                </span>
                            </div>

                            {/* Body Description */}
                            <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-[15px] mt-0.5">
                                {replyData.description}
                            </p>
                            <Separator></Separator>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
