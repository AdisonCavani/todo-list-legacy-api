import { MenuEntries } from "@lib/data";
import { cn } from "@lib/utils";
import HeaderLink from "./header-link";

function MobileMenu() {
  const classes = cn("flex h-12 items-center border-b border-neutral-800");

  return (
    <ul className="absolute flex w-full flex-col bg-neutral-900 px-8 pb-6 text-sm sm:hidden">
      {MenuEntries.map((entry, index) => (
        <HeaderLink key={index} {...entry} className={classes} />
      ))}
    </ul>
  );
}

export default MobileMenu;
