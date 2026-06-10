import { getAllProblemAction } from "@/actions/user/userAction";
import ProblemCard from "@/components/feed/problemCard";
import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";

export default async function Home() {
  const problems =await getAllProblemAction();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start ">
        <div className="w-full flex flex-col gap-4">
          {
            problems.map(problem => (
              <ProblemCard key={problem.id} problem={problem}></ProblemCard>)
            )
          }
        </div>
      </main>
    </div>
  );
}
