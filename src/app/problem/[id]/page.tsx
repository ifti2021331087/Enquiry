import { getProblemByIdAction } from "@/actions/user/userAction";
import ProblemDetails from "@/components/feed/problemDetails";
import ReplyProblem from "@/components/feed/replyProblem";
import ReplyShowingCard from "@/components/feed/replyShowingCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface problemProps {
  params: Promise<{ id: string }>
}

export default async function problemDetails({ params }: problemProps) {
  const resolveId = await params;
  const problemId = resolveId.id;
  const problems = await getProblemByIdAction(problemId);
  const problem = problems[0];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950/50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative">
          
          {/* Left Sidebar (Back Button) - Takes 2 columns */}
          <section className="lg:col-span-2 lg:sticky lg:top-24 self-start">
             <Button 
               variant="ghost" 
               className="group text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 pl-0 hover:bg-transparent transition-colors duration-200 text-sm font-medium" 
               asChild
             >
                <Link href={"/"} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  Back to feed
                </Link>
             </Button>
          </section>

          {/* Main Content Area - Increased from col-span-7 to col-span-8 */}
          <section className="lg:col-span-8 flex flex-col gap-6 w-full">
            <ProblemDetails problem={problem} />
            
            <div className="flex flex-col gap-6 mt-4">
              <ReplyProblem problem={problem} />
              <ReplyShowingCard problemId={problem.id} />
            </div>
          </section>

          {/* Right Sidebar (Author Section) - Decreased from col-span-3 to col-span-2 */}
          <section className="lg:col-span-2 lg:sticky lg:top-24 self-start">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-sm">
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-4">About the Author</h3>
              {/* TO-DO: Author Details */}
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Author information will appear here.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}