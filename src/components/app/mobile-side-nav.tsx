"use client";

import Link from "@components/router/link";
import type { ListType } from "@db/schema";
import { queryKeys } from "@lib/hooks/query";
import { IconList } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type Props = {
  initialLists: ListType[];
};

function MobileSideNav({ initialLists }: Props) {
  const pathname = usePathname();
  const { data: lists } = useQuery<ListType[]>({
    queryKey: [queryKeys.lists],
    initialData: initialLists,
  });

  if (pathname !== "/app") return;

  return (
    <nav className="flex w-full grow flex-col gap-y-2 py-8 lg:hidden">
      <h2 className="mb-4 ml-5 text-xl font-semibold">Projects</h2>
      <hr className="w-full" />

      {lists.map(({ id, name }) => (
        <Fragment key={id}>
          <Link
            href={`/app/${id}`}
            className="flex items-center gap-x-5 px-4 py-2 font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <IconList size={20} />
            {name}
          </Link>

          <hr className="w-full" />
        </Fragment>
      ))}
    </nav>
  );
}

export default MobileSideNav;
