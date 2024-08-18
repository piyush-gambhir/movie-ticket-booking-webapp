import React from "react";

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
      <div className="">
        <BookMyShowLogo />
      </div>
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

      <div className="">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
