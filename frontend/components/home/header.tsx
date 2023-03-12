import { authOptions } from "@lib/auth";
import { cn } from "@lib/utils";
import styles from "@styles/header.module.css";
import { IconChecklist } from "@tabler/icons-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed inset-0 z-10 flex h-12">
      <div className={styles.overlay} />
      <nav className="z-50 mx-auto w-full max-w-7xl px-8">
        <ul
          className={cn(
            "relative flex h-full items-center gap-x-6 text-sm font-semibold",
            "after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:bg-white/10"
          )}
        >
          <li>
            <Link href="/" className="flex items-center gap-x-1">
              <IconChecklist size={20} />
              <span className="select-none">To Do</span>
            </Link>
          </li>
          <li>
            <div>Features</div>
          </li>
          <li>
            <div>Method</div>
          </li>
          <li>
            <div>Pricing</div>
          </li>
          <li>
            <div>Company</div>
          </li>
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
                className="flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 text-sm font-medium"
              >
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
