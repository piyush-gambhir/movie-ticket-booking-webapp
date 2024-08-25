"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import BookMyShowLogo from "@/icons/BookMyShowLogo";
import { ModeToggle } from "@/components/ModeToggle"; // Import the ModeToggle component

export default function Header() {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between gap-x-4 border-b border-b-black bg-background px-8 py-4 text-foreground">
      <div className="flex items-center gap-x-4">
        <BookMyShowLogo />
      </div>
      <div className="max-w-md flex-1">
        <Input type="text" placeholder="Search for movies" className="w-full" />
      </div>
      <div className="flex items-center gap-x-4">
        <ModeToggle /> {/* Replace the Button with ModeToggle component */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
