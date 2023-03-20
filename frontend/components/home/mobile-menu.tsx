import { cn } from "@lib/utils";

function MobileMenu() {
  const classes = cn("flex h-12 items-center border-b border-neutral-800");

  return (
    <ul className="absolute flex w-full flex-col bg-neutral-900 px-8 pb-6 sm:hidden">
      <li className={classes}>
        <a href="#">Features</a>
      </li>
      <li className={classes}>
        <a href="#">Method</a>
      </li>
      <li className={classes}>
        <a href="#">Pricing</a>
      </li>
      <li className={classes}>
        <a href="#">Company</a>
      </li>
    </ul>
  );
}

export default MobileMenu;
