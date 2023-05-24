import { MenuEntries, MenuEntry } from "@lib/data";
import { isUrlInternal } from "@lib/helpers";
import Link from "next/link";
import { Fragment } from "react";

const FooterEntries: MenuEntry[] = [
  { name: "Analytics", href: "https://insights.k1ng.dev" },
  ...MenuEntries,
];

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <p className="text-center text-sm leading-6 text-neutral-200">
        © {new Date().getUTCFullYear()} Adrian Środoń. All rights reserved.
      </p>
      <div className="mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-neutral-400">
        {FooterEntries.map(({ name, href }, index) => (
          <Fragment key={index}>
            {isUrlInternal(href) ? (
              <>
                <Link href={href}>{name}</Link>
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
