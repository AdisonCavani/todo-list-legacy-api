"use client";

import Link from "@components/router/link";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import type { ListType } from "@db/schema";
import { queryKeys, useCreateListMutation } from "@lib/hooks/query";
import { cn } from "@lib/utils";
import { IconList, IconTextPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState, type FormEventHandler } from "react";

type Props = {
  initialLists: ListType[];
};

function SideNav({ initialLists }: Props) {
  const { data: lists } = useQuery<ListType[]>({
    queryKey: [queryKeys.lists],
    initialData: initialLists,
  });

  const pathname = usePathname();
  const [name, setName] = useState<string>("");

  const { mutate } = useCreateListMutation();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (name.trim().length === 0)
      mutate({
        name: "Untitled list",
      });
    else
      mutate({
        name: name,
      });

    setName("");
  };

  return (
    <>
      {lists.map(({ id, name }) => (
        <Link
          key={id}
          href={`/app/${id}`}
          className={cn(
            "inline-flex items-center gap-x-8 rounded-md px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            pathname === `/app/${id}`
              ? "bg-neutral-100 font-semibold text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-700"
              : "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <IconList size={22} />
          {name}
        </Link>
      ))}

      {lists.length > 0 && <hr className="w-full" />}

      <form onSubmit={handleOnSubmit} className="flex items-center gap-x-2">
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          icon={<IconTextPlus size={22} />}
          className="text-blue-600 dark:text-blue-400"
        />
        <Input
          placeholder="New list"
          className="border-none placeholder:font-semibold placeholder:text-blue-600 dark:placeholder:text-blue-400"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>
    </>
  );
}

export default SideNav;
