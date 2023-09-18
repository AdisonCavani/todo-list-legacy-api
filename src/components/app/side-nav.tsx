"use client";

import Link from "@components/router/link";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import type { ListType } from "@db/schema";
import { queryKeys, useCreateListMutation } from "@lib/hooks/query";
import { cn } from "@lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { IconList, IconPlus } from "@tabler/icons-react";
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

  const { mutate, isPending } = useCreateListMutation();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    mutate({
      name: name,
    });

    setName("");
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-sm font-semibold">Projects</h3>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="xxs"
              variant="ghost"
              icon={<IconPlus size={22} />}
              className="text-muted-foreground"
            />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Lists</h4>
                <p className="text-sm text-muted-foreground">
                  Set the name for the new list.
                </p>
              </div>
              <div className="grid gap-2">
                <form
                  onSubmit={handleOnSubmit}
                  className="grid grid-cols-3 items-center gap-4"
                >
                  <Input
                    onChange={(event) => setName(event.currentTarget.value)}
                    placeholder="My projects"
                    className="col-span-2 h-8"
                  />

                  <PopoverClose asChild>
                    <Button
                      size="xs"
                      disabled={name.trim().length === 0}
                      loading={isPending}
                      type="submit"
                    >
                      Save
                    </Button>
                  </PopoverClose>
                </form>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <hr className="my-1 w-full" />

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
    </>
  );
}

export default SideNav;
