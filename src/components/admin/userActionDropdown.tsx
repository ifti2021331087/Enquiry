"use client"

import { MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { banUserByIdAction, deleteUserByIdAction, unBanUserByIdAction } from "@/actions/admin/adminAction"
import { toast } from "sonner"
import { useTransition } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

interface userProps {
    userId: string,
    banned: boolean | null,
    email: string
}

export default function UserActionsDropdown({ userId, banned, email }: userProps) {

    const [isPendingBan, startTransitionBan] = useTransition();
    const [isPendingDelete, startTransitionDelete] = useTransition();
    const handleBan = async () => {
        startTransitionBan(async () => {
            // console.log(banned);
            if (email === "admin@test.com") {
                toast.success("Demo Mode: User ban simulated successfully!");
                return;
            }
            if (banned) {
                const result = await unBanUserByIdAction(userId);
                if (result.success) {
                    toast.success(result.message);
                }
                else {
                    toast.error("Something went wrong while Unbanning the user.")
                }
            }
            else {
                const result = await banUserByIdAction(userId);
                if (result.success) {
                    toast.success(result.message);
                }
                else {
                    toast.error("Something went wrong while banning the user.")
                }
            }
        })
    }
    const handleDelete = async () => {
        console.log("user deleted button");
        startTransitionDelete(async () => {
            const result = await deleteUserByIdAction(userId);

            if (result.success) {
                toast.success(result.message);
            }
            else {
                toast.error("Something went wrong while deleting the user");
            }
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <MoreHorizontalIcon className="size-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-lg">
                <DropdownMenuItem onClick={handleBan} disabled={isPendingBan}>
                    {
                        banned ? (isPendingBan ? "Unbanning..." : "Unban")
                            : (isPendingBan ? "Banning..." : "Ban")
                    }
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* onClick is perfectly safe here! */}
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={isPendingDelete}>
                                {isPendingDelete ? "Deleting..." : "Delete user"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                            <AlertDialogHeader>
                                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                    <Trash2Icon />
                                </AlertDialogMedia>
                                <AlertDialogTitle>Delete user?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete this user.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                                <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={isPendingDelete}>
                                    {isPendingDelete ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}