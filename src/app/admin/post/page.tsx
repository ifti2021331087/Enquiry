import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAdminProblemsAction } from "@/actions/admin/adminAction"
import PostActionsDropdown from "@/components/admin/postActionDropdown"
import { FileText, SearchX } from "lucide-react"

export default async function AdminPostList() {
  const problems = await getAdminProblemsAction();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric", 
    year: "numeric",
  });

  if (!problems || problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 w-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/20 shadow-sm">
        <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-full mb-4">
          <SearchX className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No posts found</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs">
          There are currently no problems submitted by users.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          Manage Posts
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          View and moderate all user-submitted problems across the platform.
        </p>
      </div>

      {/* Table Card */}
      <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 overflow-hidden flex flex-col">
        {/* The overflow-x-auto wrapper ensures horizontal scrolling on small screens */}
        <div className="overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
          <Table className="w-full text-sm min-w-[700px]">
            <TableHeader className="bg-zinc-50/80 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
              <TableRow className="hover:bg-transparent">
                {/* Added whitespace-nowrap to headers so they never break into two lines */}
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap">Post Title</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap">Author</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-center whitespace-nowrap">Replies</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap">Posted</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((problem) => {
                const formattedDate = problem.posted 
                  ? dateFormatter.format(new Date(problem.posted)) 
                  : "N/A";

                return (
                  <TableRow 
                    key={problem.id} 
                    className="transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-900/10 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
                  >
                    {/* Added min-w to the title so it doesn't crush on mobile, but still truncates nicely */}
                    <TableCell className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 min-w-[250px] max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] truncate">
                      {problem.title}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-medium whitespace-nowrap">
                      {problem.author || "Unknown"}
                    </TableCell>     
                    <TableCell className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {problem.replies}
                      </span>
                    </TableCell>        
                    <TableCell className="px-6 py-4 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {formattedDate}
                    </TableCell> 
                    <TableCell className="px-6 py-4 text-right whitespace-nowrap">
                      <PostActionsDropdown problemId={problem.id}></PostActionsDropdown>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}