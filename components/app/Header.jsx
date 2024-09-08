"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { User, LogOut, Settings, Ticket } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function Header({ user }) {
  const router = useRouter();
  const handleLogout = async () => {
    router.push("/signout");
  };

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between gap-x-4 border-b border-b-black/10 bg-background px-8 py-4 text-foreground dark:border-b-white/10">
      <div className="flex items-center gap-x-4">
        <Link href="/" className="object-contain">
          <Image src={"/logo.png"} alt="Logo" width={40} height={50} />
        </Link>
      </div>
      <nav className="hidden space-x-4 md:flex">
        <Link
          href="/movies"
          className="text-foreground transition-colors hover:text-primary"
        >
          Movies
        </Link>
        <Link
          href="/theaters"
          className="text-foreground transition-colors hover:text-primary"
        >
          Theaters
        </Link>
        <Link
          href="/offers"
          className="text-foreground transition-colors hover:text-primary"
        >
          Offers
        </Link>
      </nav>
      <div className="max-w-md flex-1">
        <Input type="text" placeholder="Search for movies" className="w-full" />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {user?.role === "admin" && (
                <Link href="/admin">
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Admin
                  </DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/signin">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
