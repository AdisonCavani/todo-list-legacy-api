"use client";

import Link from "@components/router/link";
import { Button, buttonVariants } from "@components/ui/button";
import { Input } from "@components/ui/input";
import type { ListType } from "@db/schema";
import { queryKeys, useCreateListMutation } from "@lib/hooks/query";
import { IconTextPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState, type FormEventHandler } from "react";

type Props = {
  initialLists: ListType[];
};

function SideNav({ initialLists }: Props) {
  const { data: lists } = useQuery<ListType[]>({
    queryKey: [queryKeys.lists],
    initialData: initialLists,
  });

  const [name, setName] = useState<string>("");

  const { mutate } = useCreateListMutation();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (name.trim().length === 0) return;

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
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
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
        />
        <Input
          placeholder="New list"
          className="border-none placeholder:text-black dark:placeholder:text-white"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>
    </>
  );
}

export default SideNav;
