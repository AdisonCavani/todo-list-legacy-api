import { MenuEntries, MenuEntry } from "@lib/data";
import { isUrlInternal } from "@lib/helpers";
import Link from "next/link";
import { Fragment } from "react";

const FooterEntries: MenuEntry[] = [
  { name: "Analytics", href: "https://insights.k1ng.dev" },
  { name: "Health", href: "/health" },
  ...MenuEntries,
];

function Footer() {
  return (
    <footer className="border-t py-10">
      <p className="text-center text-sm leading-6">
        © {new Date().getUTCFullYear()} Adrian Środoń. All rights reserved.
      </p>
      <div className="mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-muted-foreground">
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
    </footer>
  );
}

function Divider({ index }: { index: number }) {
  return (
    <>
      {index !== FooterEntries.length - 1 && (
        <hr className="h-4 w-px border-0 bg-muted" />
      )}
    </>
  );
}

export default Footer;
