"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/useCurrentUser";

import { logout } from "@/actions/auth/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

import BookMyShowLogo from "@/icons/BookMyShowLogo";

export default function Header() {
  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {}, [user]);
  return (
    <div className="sticky top-0 flex w-full items-center justify-between gap-x-4 border-b border-b-black bg-background px-8 py-4 text-foreground dark:border-b-white">
      <div className="flex items-center gap-x-4">
        <Link href="/" className="">
          <BookMyShowLogo />
        </Link>
      </div>
      <div className="max-w-md flex-1">
        <Input type="text" placeholder="Search for movies" className="w-full" />
      </div>
      <div className="flex items-center gap-x-4">
        <ModeToggle />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  logout();
                  router.push("/signin");
                }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button type="submit" className="w-full">
            <Link href="/signin">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
