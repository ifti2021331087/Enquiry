
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

export default async function AdminUserList() {
  const users = await getAdminUsersAction();

  if(!users){
    return(
      <div>
        No users yet
      </div>
    )
  }
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
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">User</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Role</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posts</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Joined</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</TableHead>
            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user) => {
              const formattedDate = user.joined
                ? dateFormatter.format(new Date(user.joined)) 
                : "N/A";

              return (
                <TableRow 
                  key={user.id} 
                  className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50"
                >
                  <TableCell className="font-medium text-zinc-900 dark:text-zinc-100 py-4">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">
                    {user.role || "Unknown"}
                  </TableCell>     
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                      {user.posts}
                    </span>
                  </TableCell>        
                  <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formattedDate}
                  </TableCell> 
                  <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">
                    <Badge>{!user.status?"active":"banned"}</Badge>
                  </TableCell> 
                  
                  <TableCell className="text-right">
                    <UserActionsDropdown userId={user.id} banned={user.status}></UserActionsDropdown>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  )
}