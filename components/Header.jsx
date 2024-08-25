"use client";
import React from "react";
import Link from "next/link";

import { logout } from "@/actions/auth/logout";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import BookMyShowLogo from "@/icons/BookMyShowLogo";

export default function Header() {
  return (
    <div className="bordder-b-black sticky top-0 flex w-full items-center justify-between gap-x-4 border-b bg-white px-8 py-4">
      <Link href="/" className="">
        <BookMyShowLogo />
      </Link>
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="">Movies</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <NavigationMenuLink className="">Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              console.log("Profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              logout();
              console.log("Sign Out");
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
