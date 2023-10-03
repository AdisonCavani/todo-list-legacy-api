"use client";

import Link from "@components/router/link";
import { Button } from "@components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import type { ListType } from "@db/schema";
import {
  queryKeys,
  useCreateListMutation,
  useDeleteListMutation,
} from "@lib/hooks/query";
import { useToast } from "@lib/hooks/use-toast";
import { IconEdit, IconList, IconPlus, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState, type FormEventHandler } from "react";

type Props = {
  initialLists: ListType[];
};

function MobileNav({ initialLists }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const pathname = usePathname();
  const { data: lists } = useQuery<ListType[]>({
    queryKey: [queryKeys.lists],
    initialData: initialLists,
  });

  const [name, setName] = useState<string>("");
  const submitDisabled = name.trim().length === 0;

  const { mutate, isPending } = useCreateListMutation();
  const { mutate: deleteList, isPending: deleteListLoading } =
    useDeleteListMutation();

  const [list, setList] = useState<string>("");

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
            <Dialog
              onOpenChange={() => {
                setList("");
              }}
            >
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <Link
                    href={`/app/${id}`}
                    className="z-10 flex items-center gap-x-5 p-4 font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-accent active:text-accent-foreground"
                  >
                    <IconList size={20} />
                    {name}
                  </Link>
                </ContextMenuTrigger>

                <ContextMenuContent>
                  <ContextMenuItem
                    onClick={() =>
                      toast({
                        title: "This feature is not available yet.",
                        description:
                          "Work in progress. Sorry for the inconvenience.",
                      })
                    }
                  >
                    <IconEdit size={16} />
                    Edit
                  </ContextMenuItem>

                  <ContextMenuSeparator />

                  <DialogTrigger
                    asChild
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ContextMenuItem className="text-red-600 dark:text-red-400">
                      <IconTrash size={16} />
                      Remove
                    </ContextMenuItem>
                  </DialogTrigger>
                </ContextMenuContent>
              </ContextMenu>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete list</DialogTitle>
                  <DialogDescription>
                    To confirm, type &quot;<b>{name}</b>&quot; in the box below
                  </DialogDescription>
                </DialogHeader>

                <Input
                  placeholder={name}
                  value={list}
                  onChange={(event) => setList(event.currentTarget.value)}
                />
                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={list.trim() !== name.trim()}
                  loading={deleteListLoading}
                  onClick={(event) => {
                    event.preventDefault();

                    deleteList(id);

                    if (pathname === `/app/${id}`) push("/app");
                  }}
                >
                  Delete this list
                </Button>
              </DialogContent>
            </Dialog>

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
