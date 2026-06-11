
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteProblemByIdAction, getAdminProblemsAction } from "@/actions/admin/adminAction"
import { toast } from "sonner"
import PostActionsDropdown from "@/components/admin/postActionDropdown"

export default async function AdminUserList() {
  const problems = await getAdminProblemsAction();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric", 
    year: "numeric",
  });
  
  return (
    <div className="w-full mx-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/20">
          <TableRow className="hover:bg-transparent">
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Post</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Author</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Replies</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posted</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems &&
            problems.map((problem) => {
              const formattedDate = problem.posted 
                ? dateFormatter.format(new Date(problem.posted)) 
                : "N/A";

              return (
                <TableRow 
                  key={problem.id} 
                  className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50"
                >
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100 py-4">
                    {problem.title}
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">
                    {problem.author || "Unknown"}
                  </TableCell>     
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                      {problem.replies}
                    </span>
                  </TableCell>        
                  <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formattedDate}
                  </TableCell> 
                  
                  <TableCell className="text-right">
                    <PostActionsDropdown problemId={problem.id}></PostActionsDropdown>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  )
}