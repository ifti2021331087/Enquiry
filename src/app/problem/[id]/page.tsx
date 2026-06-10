

import { getProblemByIdAction } from "@/actions/user/userAction";
import ProblemDetails from "@/components/feed/problemDetails";
import ReplyProblem from "@/components/feed/replyProblem";
import ReplyShowingCard from "@/components/feed/replyShowingCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface problemProps {
  params: Promise<{ id: string }>
}


export default async function problemDetails({ params }: problemProps) {
  const resolveId = await params;
  const problemId = resolveId.id;
  const problems = await getProblemByIdAction(problemId)
  const problem = problems[0];

  return (
    <div className="flex justify-between">
      <section className="max-w-xl">
         <Button asChild>
            <Link href={"/"}>Back to feed</Link>
         </Button>
      </section>
      <section className="max-w-4xl mx-auto flex flex-col justify-center items-center gap-4">
        <ProblemDetails problem={problem}></ProblemDetails>
        <ReplyShowingCard problemId={problem.id}></ReplyShowingCard>
        <ReplyProblem problem={problem}></ReplyProblem>
      </section>
      <section className="max-w-xl ">
          <div>
            Author Section
          </div>
          {/* TO-DO */}
      </section>
    </div>
  )
}
