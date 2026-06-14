import { auth } from "@/lib/utils/auth";
import { Badge } from "../ui/badge";
import { headers } from "next/headers";
import Link from "next/link";
import { getHasUserLikedProblem, getProblemLikeCountById, getRepliesByIdAction } from "@/actions/user/userAction";
import { MessageCircleReply, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import LikeButton from "./likeButton";


interface problemProps {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    tags: string[] | null;
    userId: string,
    authorName:string|null,
    createdAt: Date;
    updatedAt: Date;
}

export default async function ProblemCard({ problem }: { problem: problemProps }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const tags = problem.tags;
    const fullName = problem.authorName || "";
    const nameParts = fullName.trim().split(" ");
    const surname = nameParts.length > 1 ? nameParts.pop() : nameParts[0];
    console.log(fullName,surname);

    const formatedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        hour: "numeric",
    }).format(new Date(problem.createdAt));
    const totalLikes = await getProblemLikeCountById(problem.id);
    const hasLiked=await getHasUserLikedProblem(problem.id);
    const replies=await getRepliesByIdAction(problem.id);
    
    let replyLength=0;
    if(Array.isArray(replies))replyLength=replies.length;
    else replyLength=0;
    // console.log(replies);
    return (
        <div className="w-full border border-blue-800 rounded-md p-4">
            <div className="flex w-full flex-wrap justify-start gap-2">
                {
                    tags && (
                        tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))
                    )
                }
            </div>
            <div className="space-y-2">
                <Link href={`/problem/${problem.id}`}>
                    <h1 className="text-lg font-medium underline hover:font-semibold">{problem.title}</h1>
                </Link>
                <p className="text-muted-foreground leading-relaxed line-clamp-2">{problem.description}</p>
            </div>

            <div className="flex items-center justify-start gap-4 mt-2">
                <div className="w-6 h-6 rounded-full ">
                    {fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                    {surname}
                </div>
                <span>{formatedDate}</span>
                <Button variant={"outline"}><MessageCircleReply/> {replyLength} replies</Button>
                {/* <Button variant={"outline"}><span className="flex gap-1"><ThumbsUp /> {totalLikes}</span></Button> */}
                <LikeButton problemId={problem.id} initialLikes={totalLikes} hasLiked={hasLiked}></LikeButton>
            </div>
        </div>
    )
}
