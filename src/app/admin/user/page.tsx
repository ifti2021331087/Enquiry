
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { deleteProblemByIdAction, getAdminProblemsAction } from "@/actions/admin/adminAction"
// import { toast } from "sonner"
// import PostActionsDropdown from "@/components/admin/postActionDropdown"

// export default async function AdminUserList() {
//   const problems = await getAdminProblemsAction();

//   const dateFormatter = new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric", 
//     year: "numeric",
//   });
  
//   return (
//     <div className="w-full mx-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
//       <Table className="w-full">
//         <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/20">
//           <TableRow className="hover:bg-transparent">
//             <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Post</TableHead>
//             <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Author</TableHead>
//             <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Replies</TableHead>
//             <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posted</TableHead>
//             <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {problems &&
//             problems.map((problem) => {
//               const formattedDate = problem.posted 
//                 ? dateFormatter.format(new Date(problem.posted)) 
//                 : "N/A";

//               return (
//                 <TableRow 
//                   key={problem.id} 
//                   className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50"
//                 >
//                   <TableCell className="font-medium text-zinc-900 dark:text-zinc-100 py-4">
//                     {problem.title}
//                   </TableCell>
//                   <TableCell className="text-zinc-600 dark:text-zinc-400">
//                     {problem.author || "Unknown"}
//                   </TableCell>     
//                   <TableCell>
//                     <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
//                       {problem.replies}
//                     </span>
//                   </TableCell>        
//                   <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">
//                     {formattedDate}
//                   </TableCell> 
                  
//                   <TableCell className="text-right">
//                     <PostActionsDropdown problemId={problem.id}></PostActionsDropdown>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }




import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAdminUsersAction } from "@/actions/admin/adminAction"
import { Badge } from "@/components/ui/badge";
import UserActionsDropdown from "@/components/admin/userActionDropdown";
import { Users, UserX } from "lucide-react";

export default async function AdminUserList() {
  const users = await getAdminUsersAction();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric", 
    year: "numeric",
  });

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 w-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/20 shadow-sm">
        <div className="bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-full mb-4">
          <UserX className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No users found</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs">
          There are currently no registered users on the platform.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
          Manage Users
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          View, monitor, and manage account statuses for all registered users.
        </p>
      </div>

      {/* Table Card */}
      <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-sm">
            <TableHeader className="bg-zinc-50/80 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">User</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Role</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-center">Posts</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Joined</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</TableHead>
                <TableHead className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const formattedDate = user.joined
                  ? dateFormatter.format(new Date(user.joined)) 
                  : "N/A";

                const isBanned = user.status;
                const isAdmin = user.role?.toLowerCase() === 'admin';

                return (
                  <TableRow 
                    key={user.id} 
                    className="transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0"
                  >
                    <TableCell className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {isAdmin ? (
                         <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 border-transparent shadow-none">
                            Admin
                         </Badge>
                      ) : (
                        <span className="text-zinc-600 dark:text-zinc-400 capitalize font-medium">{user.role || "User"}</span>
                      )}
                    </TableCell>     
                    <TableCell className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {user.posts}
                      </span>
                    </TableCell>        
                    <TableCell className="px-6 py-4 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {formattedDate}
                    </TableCell> 
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={isBanned ? "destructive" : "default"}
                        className={!isBanned ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-transparent shadow-none" : "shadow-none"}
                      >
                        {!isBanned ? "Active" : "Banned"}
                      </Badge>
                    </TableCell> 
                    <TableCell className="px-6 py-4 text-right whitespace-nowrap">
                      <UserActionsDropdown userId={user.id} banned={isBanned}></UserActionsDropdown>
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