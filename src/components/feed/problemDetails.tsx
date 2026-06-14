import Image from "next/image";
import { Badge } from "../ui/badge";
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";



interface props {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    tags: string[] | null;
    userId: string;
    authorName:string|null,
    createdAt: Date;
    updatedAt: Date;
}

export default async function ProblemDetails({ problem }: { problem: props }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const fullName = problem.authorName || "";
    const nameParts = fullName.trim().split(" ");
    const surname = nameParts.length > 1 ? nameParts.pop() : nameParts[0];
    const formatedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        hour: "numeric",
    }).format(new Date(problem.createdAt))
    
    return (
        <div className="flex w-full flex-wrap justify-start gap-2 rounded-md p-4">
            {
                problem.tags && (
                    problem.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))
                )
            }
            <div className="space-y-2">
                <h1 className="text-lg font-medium ">{problem.title}</h1>
                <p className="text-muted-foreground">{problem.description}</p>
            </div>
            <div className="relative w-full h-100 rounded-md border bg-gray-50/50">
                <Image src={problem.fileUrl} alt="problem.fileUrl" fill className="object-contain"></Image>
            </div>
            <div className="flex items-center justify-start gap-4 mt-2">
                <div className="w-6 h-6 rounded-full ">
                    {fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                    {surname}
                </div>
                <span>{formatedDate}</span>
            </div>
        </div>
    )
}
