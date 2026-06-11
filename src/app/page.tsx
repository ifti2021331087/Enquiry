import { getAllProblemAction } from "@/actions/user/userAction";
import ProblemCard from "@/components/feed/problemCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface homeProps {
  searchParams: Promise<{ topic?: string }>
}
export default async function Home({searchParams}: homeProps) {

  const resolvedParams = await searchParams;
  const currentTopic = resolvedParams.topic;
  const problems = await getAllProblemAction(currentTopic);

  const TOPICS = [
    { name: "JavaScript", slug: "javascript", color: "bg-orange-500", count: 234 },
    { name: "Database", slug: "database", color: "bg-blue-600", count: 189 },
    { name: "Next.js", slug: "nextjs", color: "bg-zinc-800 dark:bg-zinc-300", count: 156 },
    { name: "TypeScript", slug: "typescript", color: "bg-blue-400", count: 142 },
  ];

  return (
    <div className="flex bg-zinc-50 font-sans dark:bg-black min-h-screen relative">
      <section className="basis-1/6 sticky top-24 self-start flex flex-col mt-8 px-4 gap-y-2">
        <Label className="py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Browse
        </Label>
        {/* Added justify-start so the button text aligns left like a typical sidebar */}
        <Button variant="outline" className="justify-start" asChild><Link href={"/"}>All problems</Link></Button>
        <Button variant="outline" className="justify-start">Recent</Button>
        <Button variant="outline" className="justify-start">Trending</Button>

        <div className="pt-8 flex flex-col gap-2">
          <Label className="py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Topics
          </Label>

          {/* 2. Map through the TOPICS array to generate the links */}
          <ul className="flex flex-col gap-1">
            {TOPICS.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/?topic=${topic.slug}`}
                  className={`flex items-center justify-between px-2 py-2 rounded-md transition-colors group ${currentTopic === topic.slug
                    ? "bg-zinc-200 dark:bg-zinc-800" // Active state styling
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${topic.color}`}></span>
                    <span className={`text-sm group-hover:text-black dark:group-hover:text-white ${currentTopic === topic.slug ? "font-semibold text-black dark:text-white" : "text-zinc-700 dark:text-zinc-300"
                      }`}>
                      {topic.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">
                    {topic.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="
        flex flex-1 w-full flex-col 
        py-10 px-10 dark:bg-black sm:items-start 
        border-l border-r"
      >
        <div className="w-full flex flex-col gap-4">
          {problems.length > 0 ? (
            problems.map(problem => (
              <ProblemCard key={problem.id} problem={problem}></ProblemCard>
            ))
          ) : (
            // 3. Added a fallback state if filtering returns empty results
            <div className="text-center text-zinc-500 py-10 w-full border rounded-lg border-dashed">
              No problems found for this topic.
            </div>
          )}
        </div>
      </section>

      <section className="basis-1/6">
        {/* Right Sidebar */}
      </section>
    </div>
  );
}