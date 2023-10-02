"use client";

import Link from "@components/router/link";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import { useDeleteListMutation } from "@lib/hooks/query";
import { useToast } from "@lib/hooks/use-toast";
import { cn } from "@lib/utils";
import { IconDots, IconEdit, IconList, IconTrash } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, type MouseEventHandler } from "react";

type Props = {
  id: string;
  name: string;
};

function SideNavItem({ id, name }: Props) {
  const { toast } = useToast();
  const { push } = useRouter();
  const pathname = usePathname();
  const { mutate: deleteList, isPending: deleteListLoading } =
    useDeleteListMutation();

  const [list, setList] = useState<string>("");

  const removeDisabled = list.trim() !== name.trim();

  // TODO: use <form />
  const handleOnRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    deleteList(id);

    if (pathname === `/app/${id}`) push("/app");
  };

  return (
    <Link
      key={id}
      href={`/app/${id}`}
      className={cn(
        "group mr-2 inline-flex items-center justify-between rounded-md px-3 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pathname === `/app/${id}`
          ? "bg-neutral-100 font-semibold text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-700"
          : "hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div className="flex items-center gap-x-5 py-2">
        <IconList size={20} />
        {name}
      </div>

      <Dialog
        onOpenChange={() => {
          setList("");
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="xxs"
              variant="ghost"
              icon={<IconDots size={18} />}
              className="invisible text-muted-foreground group-hover:visible"
              onClick={(event) => event.preventDefault()}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" sideOffset={16}>
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();
                toast({
                  title: "This feature is not available yet.",
                  description: "Work in progress. Sorry for the inconvenience.",
                });
              }}
            >
              <IconEdit size={16} />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DialogTrigger asChild onClick={(event) => event.stopPropagation()}>
              <DropdownMenuItem
                onClick={(event) => event.stopPropagation()}
                className="text-red-600 dark:text-red-400"
              >
                <IconTrash size={16} />
                Remove
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
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
            disabled={removeDisabled}
            loading={deleteListLoading}
            onClick={handleOnRemove}
          >
            Delete this list
          </Button>
        </DialogContent>
      </Dialog>
    </Link>
  );
}

export default SideNavItem;
