



// import React from 'react'
// import { Badge } from '../ui/badge'
// import Link from 'next/link'
// import { Button } from '../ui/button'
// import { MessageCircleReply } from 'lucide-react'
// import LikeButton from '../feed/likeButton'

// export default function ProfileProblemCard() {
//   return (
//     <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col gap-4">
            
//             {/* Top Row: Tags */}
//             <div className="flex w-full flex-wrap justify-start gap-2">
//                 {
//                     tags && (
//                         tags.map((tag) => (
//                             <Badge 
//                                 variant="secondary" // Using a secondary variant usually looks cleaner
//                                 className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 font-medium px-2.5 py-0.5" 
//                                 key={tag}
//                             >
//                                 {tag}
//                             </Badge>
//                         ))
//                     )
//                 }
//             </div>

//             {/* Middle Row: Title and Description */}
//             <div className="space-y-1.5 flex-1">
//                 <Link href={`/problem/${problem.id}`} className="group block">
//                     <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
//                         {problem.title}
//                     </h1>
//                 </Link>
//             </div>

//             {/* Bottom Row: User Info and Actions */}
//             <div className="flex items-center justify-between mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                
//                 {/* Author Info */}
//                 <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-600 dark:text-zinc-300">
//                         {fullName.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-sm">
//                         <span className="font-medium text-zinc-700 dark:text-zinc-300">
//                             {surname}
//                         </span>
//                         <span className="hidden sm:inline text-zinc-300 dark:text-zinc-600">•</span>
//                         <span className="text-zinc-500 dark:text-zinc-500 text-xs sm:text-sm">
//                             {formatedDate}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Actions (Replies & Likes) */}
//                 <div className="flex items-center gap-2">
//                     <Button
//                         variant="ghost" 
//                         size="sm"
//                         className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 h-9 px-3 border border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800"
//                     >
//                         <MessageCircleReply className="w-4 h-4 mr-2 opacity-70" /> 
//                         <span>{replyLength}</span>
//                         <span className="sr-only sm:not-sr-only sm:ml-1">replies</span>
//                     </Button>
                    
//                     {/* Make sure your LikeButton component accepts a className prop or is styled similarly inside its own file */}
//                     <LikeButton
//                         problemId={problem.id} 
//                         initialLikes={totalLikes} 
//                         hasLiked={hasLiked} 
//                     />
//                 </div>
//             </div>
//         </div>
//   )
// }
