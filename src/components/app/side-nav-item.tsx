import { cn } from "@lib/utils";
import { IconList } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  id: string;
  name: string;
};

function SideNavItem({ id, name }: Props) {
  const pathname = usePathname();

  return (
    <Link
      key={id}
      href={`/app/${id}`}
      className={cn(
        "inline-flex items-center gap-x-5 rounded-md px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pathname === `/app/${id}`
          ? "bg-neutral-100 font-semibold text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-700"
          : "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <IconList size={20} />
      {name}
    </Link>
  );
}

export default SideNavItem;
