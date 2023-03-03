import { SortingOptions, sortMethodsNames } from "@lib/sort";
import { cn } from "@lib/utils";
import {
  IconArrowsSort,
  IconCalendarPlus,
  IconCalendarTime,
  IconChevronUp,
  IconStar,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  sorting: SortingOptions;
  defaultSorting: SortingOptions;
  setSorting: Dispatch<SetStateAction<SortingOptions>>;
};

function Sort({ sorting, defaultSorting, setSorting }: Props) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Tasks</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <IconArrowsSort className="mr-2 h-4 w-4" />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                setSorting({
                  fn: "sortTasksByImportance",
                  order: "desc",
                })
              }
            >
              <IconStar className="mr-2 h-4 w-4" />
              <span>Importance</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                setSorting({
                  fn: "sortTasksByDueDate",
                  order: "asc",
                })
              }
            >
              <IconCalendarTime className="mr-2 h-4 w-4" />
              <span>Due date</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                setSorting({
                  fn: "sortTasksByTitle",
                  order: "asc",
                })
              }
            >
              <IconArrowsSort className="mr-2 h-4 w-4" />
              <span>Alphabetically</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                setSorting({
                  fn: "sortTasksByCreationDate",
                  order: "desc",
                })
              }
            >
              <IconCalendarPlus className="mr-2 h-4 w-4" />
              <span>Creation date</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-2 flex items-center justify-end gap-x-3">
        <button
          aria-label="Reverse sort order"
          onClick={() =>
            setSorting((prev) => ({
              ...prev,
              order: prev.order === "asc" ? "desc" : "asc",
            }))
          }
        >
          <IconChevronUp
            size={24}
            className={cn(
              "stroke-1 transition-transform",
              sorting.order === "asc" ? "rotate-0" : "rotate-180"
            )}
          />
        </button>
        <p className="text-xs font-semibold">
          Sorted {sortMethodsNames[sorting.fn]}
        </p>
        <button
          aria-label="Remove sort order option"
          onClick={() => setSorting(defaultSorting)}
        >
          <IconX size={20} className="stroke-1" />
        </button>
      </div>
    </>
  );
}

export default Sort;
