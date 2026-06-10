

import { getProblemByIdAction } from "@/actions/user/userAction";
import ReplyProblem from "@/components/feed/replyProblem";
import ReplyShowingCard from "@/components/feed/replyShowingCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";
import Image from "next/image";


interface problemProps {
  params: Promise<{ id: string }>
}


export default async function problemDetails({ params }: problemProps) {
  const resolveId = await params;
  const problemId = resolveId.id;
  const problems = await getProblemByIdAction(problemId)
  const problem = problems[0];

  const session = await auth.api.getSession({
    headers: await headers()
  })

  console.log(session);

  const fullName = session?.user?.name || "";
  const nameParts = fullName.trim().split(" ");
  const surname = nameParts.length > 1 ? nameParts.pop() : nameParts[0];
  const formatedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    hour: "numeric",
  }).format(new Date(problem.createdAt));

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center items-center gap-4">
      <div className="flex w-full flex-wrap justify-start gap-2 mt-12 border border-blue-500 rounded-md p-4">
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
      <ReplyShowingCard problemId={problem.id}></ReplyShowingCard>
      <ReplyProblem problem={problem}></ReplyProblem>
    </div>
  )
}
