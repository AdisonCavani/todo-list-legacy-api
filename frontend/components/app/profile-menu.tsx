"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IconLogout, IconSettings } from "@tabler/icons-react";
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
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-600 bg-white">
          <span className="select-none text-sm font-semibold text-neutral-600">
            {initials}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
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
