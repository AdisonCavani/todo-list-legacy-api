"use client";

import Link from "@components/router/link";
import { cn } from "@lib/utils";
import { buttonVariants } from "@ui/button";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

function NavLink({ className, href, ...props }: ComponentProps<typeof Link>) {
  const segment = usePathname();
  const isActive = segment === href;

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: "ghost",
          className: cn(
            "justify-start",
            isActive ? "font-semibold text-foreground" : "text-muted-foreground"
          ),
        }),
        className
      )}
      {...props}
    />
  );
}

export default NavLink;
