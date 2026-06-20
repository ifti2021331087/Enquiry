import { getAllProblemAction } from "@/actions/user/userAction";
import ProblemCard from "@/components/feed/problemCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckSquare, Plus, Square, SearchX, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";

interface homeProps {
  searchParams: Promise<{
    topic?: string,
    sortBy?: "recent" | "trending", 
    solved?: "true" | "false",
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
    sortBy: currentSort as "recent" | "trending",
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
    } else {
      newTopics.push(slug);
    }
    return newTopics.length > 0 ? newTopics.join(",") : null;
  }

  const TOPICS = [
    { name: "JavaScript", slug: "javascript", count: 234 },
    { name: "Database", slug: "database", count: 189 },
    { name: "Next.js", slug: "nextjs", count: 156 },
    { name: "TypeScript", slug: "typescript", count: 142 },
  ];

  // Extracted filter logic so we can reuse it for Mobile Dropdown & Desktop Sidebar
  const FilterContent = (
    <div className="flex flex-col gap-8">
      {/* Browse Section */}
      <div className="flex flex-col gap-2">
        <Label className="py-1 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Browse</Label>
        <div className="flex flex-col gap-1">
          <Button variant={currentSort === "recent" ? "default" : "ghost"} className={`rounded-md justify-start transition-all ${currentSort !== 'recent' ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80' : 'shadow-sm'}`} asChild>
            <Link href={createUrl({ sortBy: null })}>Recent</Link>
          </Button>
          <Button variant={currentSort === "trending" ? "default" : "ghost"} className={`rounded-md justify-start transition-all ${currentSort !== 'trending' ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80' : 'shadow-sm'}`} asChild>
            <Link href={createUrl({ sortBy: "trending" })}>Trending</Link>
          </Button>
        </div>
      </div>

      {/* Status Section */}
      <div className="flex flex-col gap-2">
        <Label className="py-1 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</Label>
        <div className="flex flex-col gap-1">
          <Button variant={String(currentSolved) === "true" ? "default" : "ghost"} className={`rounded-md justify-start transition-all ${String(currentSolved) !== 'true' ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80' : 'shadow-sm'}`} asChild>
            <Link href={createUrl({ solved: "true" })}>Solved</Link>
          </Button>
          <Button variant={String(currentSolved) === "false" ? "default" : "ghost"} className={`rounded-md justify-start transition-all ${String(currentSolved) !== 'false' ? 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80' : 'shadow-sm'}`} asChild>
            <Link href={createUrl({ solved: "false" })}>Unsolved</Link>
          </Button>
          {currentSolved && (
            <Button variant="link" className="justify-start text-xs text-zinc-500 hover:text-red-500 dark:hover:text-red-400 px-2 h-auto py-2 transition-colors" asChild>
              <Link href={createUrl({ solved: null })}>Clear filter</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Topics Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1 py-1">
          <Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Topics</Label>
          {activeTopics.length > 0 && (
            <Link href={createUrl({ topic: null })} className="text-[11px] font-semibold text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              Clear
            </Link>
          )}
        </div>

        <ul className="flex flex-col gap-1">
          {TOPICS.map((topic) => {
            const isChecked = activeTopics.includes(topic.slug);
            return (
              <li key={topic.slug}>
                <Link
                  href={createUrl({ topic: toggleTopic(topic.slug) })}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all border border-transparent group ${isChecked ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
                >
                  <div className="flex items-center gap-3">
                    {isChecked ? (
                      <CheckSquare className="w-[18px] h-[18px] text-blue-600 dark:text-blue-500" />
                    ) : (
                      <Square className="w-[18px] h-[18px] text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors" />
                    )}
                    <span className={`text-[14px] ${isChecked ? "font-semibold text-blue-700 dark:text-blue-400" : "font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"}`}>
                      {topic.name}
                    </span>
                  </div>
                  <span className={`flex text-[11px] font-semibold px-2 py-0.5 rounded-full ${isChecked ? 'bg-blue-100 text-blue-700 dark:bg-blue-800/60 dark:text-blue-300' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
                    {topic.count}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col lg:flex-row gap-6 lg:gap-12 relative">
        
        {/* Sidebar Space */}
        <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 lg:self-start flex flex-col gap-y-6 z-20">
          
          {/* Mobile Filter Toggle Button (Hidden on Desktop) */}
          <details className="group lg:hidden relative">
            <summary className="flex items-center justify-between gap-2 cursor-pointer list-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-5 py-3 rounded-xl w-full font-semibold text-sm text-zinc-800 dark:text-zinc-200 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors [&::-webkit-details-marker]:hidden">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                <span>Filter Problems</span>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform duration-300" />
            </summary>

            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 mt-2 p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 origin-top animate-in fade-in slide-in-from-top-2">
              {FilterContent}
            </div>
          </details>

          {/* Desktop Filter Sidebar (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="flex items-center gap-2 px-1 text-zinc-800 dark:text-zinc-200">
              <Filter className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              <h2 className="font-semibold tracking-tight">Filters</h2>
            </div>
            {FilterContent}
          </div>
          
          {/* Post Action Button (Sticky bottom on mobile, static on desktop) */}
          <div className="fixed bottom-6 left-0 right-0 px-4 sm:px-6 lg:static lg:px-0 lg:bottom-auto z-40">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-full lg:rounded-lg h-12 lg:h-10 transition-all active:scale-[0.98]"
              asChild
            >
              <Link href="/ask" className="flex items-center justify-center gap-2">
                <Plus className="w-5 h-5 lg:w-4 lg:h-4" />
                <span className="font-semibold text-[15px] lg:text-sm tracking-wide">Post a problem</span>
              </Link>
            </Button>
          </div>
        </aside>

        {/* Main Feed Section */}
        <main className="flex-1 w-full max-w-3xl lg:border-l border-zinc-200 dark:border-zinc-800/80 lg:pl-10 lg:pr-4 pb-24 lg:pb-8 z-10">
          <div className="w-full flex flex-col gap-5">
            {problems.length > 0 ? (
              problems.map(problem => (
                <div key={problem.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                  <ProblemCard problem={problem} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 w-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/20 mt-4 shadow-sm">
                <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-full mb-4">
                  <SearchX className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No problems found</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs">
                  We could not find anything matching your current filters. Try adjusting them to see more results.
                </p>
                {(currentTopic || currentSort !== 'recent' || currentSolved) && (
                  <Button variant="outline" className="mt-6 rounded-full" asChild>
                    <Link href="/">Clear all filters</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}