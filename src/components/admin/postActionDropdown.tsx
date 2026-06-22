"use client"

import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteProblemByIdAction } from "@/actions/admin/adminAction"
import { toast } from "sonner"
import { useTransition } from "react"

export default function PostActionsDropdown({ problemId }: { problemId: string }) {
  // useTransition prevents the UI from freezing while the server action runs
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProblemByIdAction(problemId);
      if (result.success) {
        toast.success("Problem has been deleted");
      } else {
        toast.error("Something went wrong while deleting the problem!!");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100" disabled={isPending}>
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-lg">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        {/* onClick is perfectly safe here! */}
        <DropdownMenuItem variant="destructive" onClick={handleDelete} disabled={isPending}>
          {isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}