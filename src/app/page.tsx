import { getAllProblemAction } from "@/actions/user/userAction";
import ProblemCard from "@/components/feed/problemCard";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const problems = await getAllProblemAction();

  return (
    <div className="flex bg-zinc-50 font-sans dark:bg-black ">
      <section className="basis-1/6 flex flex-col mt-8">
        <div className="space-y-2 font-medium">
          Browse
        </div>
        <Button variant="outline">All problems</Button>
        <Button variant="outline">Recent</Button>
        <Button variant="outline">Trending</Button>
      </section>
      <section className="
        flex flex-1 w-full flex-col 
        py-10 px-10 dark:bg-black sm:items-start 
        border-l border-r "
      >
        <div className="w-full flex flex-col gap-4">
          {
            problems.map(problem => (
              <ProblemCard key={problem.id} problem={problem}></ProblemCard>)
            )
          }
        </div>
      </section>
      <section className="basis-1/6">

      </section>
    </div>
  );
}
