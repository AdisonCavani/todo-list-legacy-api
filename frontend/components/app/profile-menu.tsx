"use client";

import { useToast } from "@hooks/use-toast";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@ui/dropdown-menu";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

function ProfileMenu({ firstName, lastName, email }: User) {
  const { toast } = useToast();
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  function handleNotSupportedFeature() {
    toast({
      title: "This feature is not available yet.",
      description: "Work in progress. Sorry for the inconvenience.",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">
              {firstName} {lastName}
            </p>
            <p className="w-[200px] truncate text-sm text-slate-600">{email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleNotSupportedFeature}>
          <IconSettings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
