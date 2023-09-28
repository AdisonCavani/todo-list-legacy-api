"use client";

import Link from "@components/router/link";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import type { ListType } from "@db/schema";
import { queryKeys, useCreateListMutation } from "@lib/hooks/query";
import { IconList, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Fragment, useState, type FormEventHandler } from "react";

type Props = {
  initialLists: ListType[];
};

function MobileNav({ initialLists }: Props) {
  const pathname = usePathname();
  const { data: lists } = useQuery<ListType[]>({
    queryKey: [queryKeys.lists],
    initialData: initialLists,
  });

  const [name, setName] = useState<string>("");
  const submitDisabled = name.trim().length === 0;

  const { mutate, isPending } = useCreateListMutation();

  if (pathname !== "/app") return;

  const handleOnSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    mutate({
      name: name,
    });

    setName("");
  };

  return (
    <nav className="flex w-full grow flex-col py-8 lg:hidden">
      <h2 className="mb-8 ml-5 text-xl font-semibold">Projects</h2>
      <hr className="w-full" />

      {lists
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ id, name }) => (
          <Fragment key={id}>
            <Link
              href={`/app/${id}`}
              className="flex items-center gap-x-5 p-4 font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-accent active:text-accent-foreground"
            >
              <IconList size={20} />
              {name}
            </Link>

            <hr className="w-full" />
          </Fragment>
        ))}

      <form className="mt-auto flex gap-x-2 px-5" onSubmit={handleOnSubmit}>
        <Button
          type="submit"
          icon={<IconPlus size={20} />}
          loading={isPending}
          disabled={submitDisabled}
        />
        <Input
          type="text"
          placeholder="New list"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </form>
    </nav>
  );
}

export default MobileNav;
