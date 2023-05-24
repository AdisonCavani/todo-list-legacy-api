"use client";

import { MenuEntry } from "@lib/data";
import { cn } from "@lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HeaderLink({
  name,
  href,
  className,
}: MenuEntry & { className: string }) {
  const segment = usePathname();
  const isActive = segment === href;

  return (
    <li className={cn(className, !isActive && "text-neutral-300")}>
      <Link href={href}>{name}</Link>
    </li>
  );
}

export default HeaderLink;
