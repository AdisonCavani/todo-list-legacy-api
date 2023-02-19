import { clsx } from "clsx";
import type { ReactNode } from "react";

type Props = {
  href: string;
  icon: ReactNode;
  text: string;
  count?: number;
  isSelected?: boolean;
};

function SidebarItem({ href, icon, text, count, isSelected }: Props) {
  return (
    <a
      className={clsx(
        "flex cursor-pointer items-center gap-x-3 rounded-lg px-3 py-[6px]",
        isSelected ? "bg-neutral-200" : "bg-inherit hover:bg-neutral-200/40"
      )}
    >
      {icon}
      <p
        className={clsx(
          "text-neutral-700",
          isSelected ? "font-semibold" : "font-regular"
        )}
      >
        {text}
      </p>

      {count && (
        <div
          className={clsx(
            "ml-auto w-7  rounded px-1 py-[2px] text-center text-xs font-bold text-neutral-700",
            isSelected ? "bg-white" : "bg-neutral-200"
          )}
        >
          {count}
        </div>
      )}
    </a>
  );
}

export default SidebarItem;
