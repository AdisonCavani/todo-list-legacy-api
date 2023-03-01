"use client";

import { useToast } from "@hooks/use-toast";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@ui/dropdown-menu";
import { signOut } from "next-auth/react";

type Props = {
  firstName: string;
  lastName: string;
};

function ProfileMenu({ firstName, lastName }: Props) {
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleNotSupportedFeature}>
          <IconSettings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
