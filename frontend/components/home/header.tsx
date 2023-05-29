"use client";

import HeaderLink from "./header-link";
import MobileMenu from "./mobile-menu";
import { MenuEntries } from "@lib/data";
import { cn } from "@lib/utils";
import styles from "@styles/header.module.css";
import { IconChecklist, IconMenu } from "@tabler/icons-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";

type Props = {
  session: Session | null;
};

function Header({ session }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="sticky inset-0 z-10 flex h-12">
      <div className={styles.overlay} />
      <nav className="relative z-50 mx-auto w-full max-w-7xl">
        <ul
          className={cn(
            "relative flex h-full items-center gap-x-6 px-8 text-sm  font-semibold",
            "after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:bg-black/10 dark:after:bg-white/10"
          )}
        >
          <li>
            <Link href="/" className="flex items-center gap-x-1">
              <IconChecklist size={20} />
              <span className="select-none">To Do</span>
            </Link>
          </li>
          {MenuEntries.map((entry, index) => (
            <HeaderLink key={index} {...entry} className="hidden sm:block" />
          ))}

          <li className="ml-auto">
            {session ? (
              <Link
                href="/app"
                className="flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-medium"
              >
                Open app
              </Link>
            ) : (
              <Link
                href="/auth"
                className="flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-medium text-white"
              >
                Sign in
              </Link>
            )}
          </li>
          <li className="block sm:hidden">
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              <IconMenu />
            </button>
          </li>
        </ul>

        {open && <MobileMenu />}
      </nav>
    </header>
  );
}

export default Header;
