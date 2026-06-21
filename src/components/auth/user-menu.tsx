"use client";

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { BadgeCheckIcon, BellIcon, CreditCardIcon, DiamondPlus, LogOutIcon } from 'lucide-react'
import { signOut, useSession } from '@/lib/auth-client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { data: session, isPending } = useSession();
  const router = useRouter();


  const handleLogout = async () => {
    console.log("Logout out")
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      {
        !session && (
          <Button asChild><Link href={"/auth/signIn"}>Sign In</Link></Button>
        )
      }
      {
        session?.user?.id && (
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={session?.user?.image || "https://github.com/shadcn.png"}
                  alt={session?.user?.name || "User Avatar"}
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
        )
      }
      {
        session?.user?.id && (
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <BadgeCheckIcon className="w-4 h-4" />
              {session?.user?.name}
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/pricing" className="flex items-center gap-2 w-full">
                <DiamondPlus className="w-4 h-4" />
                Upgrade
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 cursor-pointer text-red-600 focus:text-red-600">
              <LogOutIcon className="w-4 h-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        )
      }
    </DropdownMenu>
  )
}
