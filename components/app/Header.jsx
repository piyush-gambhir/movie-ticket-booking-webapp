"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  User,
  LogOut,
  Settings,
  Ticket,
  House,
  Clapperboard,
  HandCoins,
  Film,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function Header({ user }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    router.push("/signout");
  };

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between gap-x-4 border-b border-b-black/10 bg-background px-8 py-4 text-foreground dark:border-b-white/10">
      <div className="flex items-center gap-x-4">
        <Link href="/" className="object-contain">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
        </Link>
      </div>
      <nav className="hidden space-x-4 md:flex">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-x-2 rounded-full px-3 py-1 text-foreground transition-colors",
            pathname === "/" && "bg-primary",
          )}
        >
          <House className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/movies"
          className={cn(
            "flex items-center gap-x-2 rounded-full px-2 py-1 text-foreground transition-colors",
            pathname === "/movies" && "bg-primary",
          )}
        >
          <Film className="h-4 w-4" />
          Movies
        </Link>
        <Link
          href="/cinemas"
          className={cn(
            "flex items-center gap-x-2 rounded-full px-2 py-1 text-foreground transition-colors",
            pathname === "/cinemas" && "bg-primary",
          )}
        >
          <Clapperboard className="h-4 w-4" />
          Cinemas
        </Link>
        <Link
          href="/offers"
          className={cn(
            "flex items-center gap-x-2 rounded-full px-2 py-1 text-foreground transition-colors",
            pathname === "/offers" && "bg-primary",
          )}
        >
          <HandCoins className="h-4 w-4" />
          Offers
        </Link>
      </nav>

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
