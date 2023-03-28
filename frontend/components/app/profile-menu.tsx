"use client";

import { useToast } from "@hooks/use-toast";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  IconDeviceLaptop,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@ui/dropdown-menu";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

function ProfileMenu({ firstName, lastName, email }: User) {
  const { toast } = useToast();
  const { setTheme } = useTheme();
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
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full hover:bg-transparent"
        >
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <div className="flex max-w-[256px] flex-col gap-y-1 p-2 leading-none">
          <p className="truncate font-medium">
            {firstName} {lastName}
          </p>
          <p className="truncate text-sm text-slate-600 dark:text-neutral-400">
            {email}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IconSun size={16} />
            Theme
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <IconSun size={16} />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <IconMoon size={16} />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <IconDeviceLaptop size={16} />
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem onClick={handleNotSupportedFeature}>
          <IconSettings size={16} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <IconLogout size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu;
