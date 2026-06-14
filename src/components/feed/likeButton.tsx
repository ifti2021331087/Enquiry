"use client"

import { use, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLikeAction } from "@/actions/user/userAction";
import { toast } from "sonner";


interface likeProps {
    problemId: string,
    initialLikes: number,
    hasLiked: boolean
}

export default function LikeButton({ problemId, initialLikes, hasLiked }:likeProps) {
    const [isPending,startTransition]=useTransition();
    const [isLiked,setIsliked]=useState(hasLiked);
    const [likes,setLikes]=useState(initialLikes);

    const handleLike=async()=>{
        startTransition(async()=>{
            const newLike=!isLiked;
            setIsliked(newLike);
            setLikes((prev)=>newLike?prev+1:prev-1);

            try{
                const result=await toggleLikeAction(problemId);
                if(result.liked!==newLike){
                    setIsliked(result.liked);
                    setLikes((prev)=>result.liked?prev+1:prev-1);
                }
            }
            catch(e){
                console.log(e);
                setIsliked(!newLike);
                setLikes((prev) => newLike ? prev - 1 : prev + 1);

                toast.error("You must be login to like the problem.")
            }
        })
    }
    return (
        <Button
            variant={isLiked ? "default" : "outline"} // Changes color based on state
            onClick={handleLike}
            disabled={isPending}
            className="transition-all duration-200"
        >
            <span className="flex gap-2 items-center">
                <ThumbsUp
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                />
                {likes}
            </span>
        </Button>
    )
}
