import { getAllProblemAction } from "@/actions/user/userAction";
import ProblemCard from "@/components/feed/problemCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckSquare, Plus, Square } from "lucide-react";
import Link from "next/link";

interface homeProps {
  searchParams: Promise<{
    topic?: string,
    sortBy?: "recent" | "trending", // Made this optional to match your fallback logic
    solved?: "true" | "false",      // Made this optional to match your fallback logic
  }>,
}

export default async function Home({ searchParams }: homeProps) {

  const resolvedParams = await searchParams;
  const currentTopic = resolvedParams.topic;
  const currentSort = resolvedParams.sortBy || "recent";
  const currentSolved = resolvedParams.solved;

  const activeTopics = currentTopic ? currentTopic.split(",") : [];
  
  const problems = await getAllProblemAction({
    topic: currentTopic,
    sortBy: currentSort as "recent" | "trending", // Type assertion for safety
    solved: currentSolved === "true" ? true : currentSolved === "false" ? false : undefined
  });

  const createUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams();
    if (currentTopic) params.set("topic", currentTopic);
    if (currentSort !== "recent") params.set("sortBy", currentSort);
    if (currentSolved !== undefined) params.set("solved", String(currentSolved));

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    })

    return `/?${params.toString()}`
  }

  const toggleTopic = (slug: string) => {
    let newTopics = [...activeTopics];
    if (newTopics.includes(slug)) {
      newTopics = newTopics.filter(t => t !== slug);
    }
    else {
      newTopics.push(slug);
    }
    return newTopics.length > 0 ? newTopics.join(",") : null;
  }

  const TOPICS = [
    { name: "JavaScript", slug: "javascript", color: "bg-orange-500", count: 234 },
    { name: "Database", slug: "database", color: "bg-blue-600", count: 189 },
    { name: "Next.js", slug: "nextjs", color: "bg-zinc-800 dark:bg-zinc-300", count: 156 },
    { name: "TypeScript", slug: "typescript", color: "bg-blue-400", count: 142 },
  ];

  return (
    <div className="flex bg-zinc-50/50 font-sans dark:bg-zinc-950 min-h-screen relative text-zinc-900 dark:text-zinc-100">
      
      {/* Left Sidebar */}
      <section className="basis-1/6 sticky top-24 self-start flex flex-col mt-8 px-6 gap-y-2">

        <Label className="py-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Browse</Label>
        <Button variant={currentSort === "recent" ? "default" : "ghost"} className={`justify-start ${currentSort !== 'recent' && 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`} asChild>
          <Link href={createUrl({ sortBy: null })}>Recent</Link>
        </Button>
        <Button variant={currentSort === "trending" ? "default" : "ghost"} className={`justify-start ${currentSort !== 'trending' && 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`} asChild>
          <Link href={createUrl({ sortBy: "trending" })}>Trending</Link>
        </Button>

        <Label className="py-2 mt-5 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</Label>
        <Button variant={String(currentSolved) === "true" ? "default" : "ghost"} className={`justify-start ${String(currentSolved) !== 'true' && 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`} asChild>
          <Link href={createUrl({ solved: "true" })}>Solved</Link>
        </Button>
        <Button variant={String(currentSolved) === "false" ? "default" : "ghost"} className={`justify-start ${String(currentSolved) !== 'false' && 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`} asChild>
          <Link href={createUrl({ solved: "false" })}>Unsolved</Link>
        </Button>
        {currentSolved && (
          <Button variant="link" className="justify-start text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-4 h-auto py-2" asChild>
            <Link href={createUrl({ solved: null })}>Clear Status Filter</Link>
          </Button>
        )}

        <div className="pt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <Label className="py-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Topics
            </Label>
            {activeTopics.length > 0 && (
              <Link href={createUrl({ topic: null })} className="text-[11px] font-medium text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
                Clear
              </Link>
            )}
          </div>

          <ul className="flex flex-col gap-0.5">
            {TOPICS.map((topic) => {
              const isChecked = activeTopics.includes(topic.slug);

              return (
                <li key={topic.slug}>
                  <Link
                    href={createUrl({ topic: toggleTopic(topic.slug) })}
                    className="flex items-center justify-between px-3 py-2 rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/60 group"
                  >
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <CheckSquare className="w-[18px] h-[18px] text-blue-600 dark:text-blue-500" />
                      ) : (
                        <Square className="w-[18px] h-[18px] text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors" />
                      )}
                      <span className={`text-[14px] ${isChecked ? "font-semibold text-zinc-900 dark:text-white" : "font-medium text-zinc-600 dark:text-zinc-300"}`}>
                        {topic.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                      {topic.count}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          
          <Button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm dark:bg-blue-600 dark:hover:bg-blue-500 h-10 w-full"
            asChild
          >
            <Link href="/ask" className="flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="font-semibold text-sm">Post a problem</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Main Feed Section */}
      <section className="flex flex-1 w-full flex-col py-8 px-6 sm:px-10 dark:bg-zinc-950 sm:items-start border-l border-r border-zinc-200 dark:border-zinc-800/50 min-h-screen">
        <div className="w-full flex flex-col gap-4">
          {problems.length > 0 ? (
            problems.map(problem => (
              <ProblemCard key={problem.id} problem={problem}></ProblemCard>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-zinc-500 dark:text-zinc-400 py-16 w-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 mt-4">
              <p className="font-medium text-zinc-600 dark:text-zinc-300">No problems found</p>
              <p className="text-sm mt-1">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </section>

      {/* Right Spacer */}
      <section className="basis-1/6 hidden lg:block"></section>
    </div>
  );
}