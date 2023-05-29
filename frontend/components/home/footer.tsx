import ThemeButton from "./theme-button";
import { MenuEntries, MenuEntry } from "@lib/data";
import { isUrlInternal } from "@lib/helpers";
import { IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment } from "react";

const FooterEntries: MenuEntry[] = [
  { name: "Analytics", href: "https://insights.k1ng.dev" },
  { name: "Health", href: "/health" },
  ...MenuEntries,
];

function Footer() {
  return (
    <footer className="space-y-6 border-t border-white/10 py-10">
      <div className="flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-neutral-600 dark:text-neutral-400">
        {FooterEntries.map(({ name, href }, index) => (
          <Fragment key={index}>
            {isUrlInternal(href) ? (
              <>
                <Link href={href} prefetch={false}>
                  {name}
                </Link>
                <Divider index={index} />
              </>
            ) : (
              <>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {name}
                </a>
                <Divider index={index} />
              </>
            )}
          </Fragment>
        ))}
      </div>
      <div className="mx-8 flex justify-between">
        <p className="text-sm leading-6 dark:text-neutral-200">
          © {new Date().getUTCFullYear()} Adrian Środoń. All rights reserved.
        </p>
        <div className="flex items-center rounded-full border p-1 dark:border-neutral-600">
          <ThemeButton theme="dark">
            <IconMoon size={18} />
          </ThemeButton>
          <ThemeButton theme="light">
            <IconSun size={18} />
          </ThemeButton>
          <ThemeButton theme="system">
            <IconDeviceLaptop size={18} />
          </ThemeButton>
        </div>
      </div>
    </footer>
  );
}

function Divider({ index }: { index: number }) {
  return (
    <>
      {index !== FooterEntries.length - 1 && (
        <hr className="h-4 w-px border-0 bg-neutral-300 dark:bg-neutral-600" />
      )}
    </>
  );
}

export default Footer;
