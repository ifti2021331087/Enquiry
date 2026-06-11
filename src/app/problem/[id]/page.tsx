

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
         <div className="sticky top-24 lg:top-32">
             <Button 
               variant="ghost" 
               className="group text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white pl-0 transition-colors duration-200 text-sm font-medium" 
               asChild
             >
                <Link href={"/"}>
                  <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">&larr;</span> 
                  Back to feed
                </Link>
             </Button>
          </div>
      </section>
      <section className="max-w-4xl mx-auto flex flex-col justify-center items-center gap-4 mt-5 border-l border-r">
        <ProblemDetails problem={problem}></ProblemDetails>
        <ReplyShowingCard problemId={problem.id}></ReplyShowingCard>
        <ReplyProblem problem={problem}></ReplyProblem>
      </section>
      <section className="max-w-xl mt-5 ">
          <div>
            Author Section
          </div>
          {/* TO-DO */}
      </section>
    </div>
  )
}
