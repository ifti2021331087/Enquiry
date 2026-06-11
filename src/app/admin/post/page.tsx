import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAdminProblemsAction } from "@/actions/admin/adminAction"

export default async function AdminPostList() {
  const problems = await getAdminProblemsAction();

  // 1. Define the reusable formatter here, without passing a specific date yet
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric", 
    year: "numeric",
  });
  
  return (
    <div className="w-full mx-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Replies</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems &&
            problems.map((problem) => {
              // 2. Format the date INSIDE the loop using the action's alias 'posted'
              const formattedDate = problem.posted 
                ? dateFormatter.format(new Date(problem.posted)) 
                : "N/A";

              return (
                <TableRow key={problem.id}>
                  <TableCell className="font-medium">{problem.title}</TableCell>
                  <TableCell>{problem.author || "Unknown"}</TableCell>     
                  <TableCell>{problem.replies}</TableCell>        
                  
                  <TableCell className="text-zinc-500 text-sm">{formattedDate}</TableCell> 
                  
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  )
}