"use client";

import Form from "./form";
import Task from "./task";
import { sortMethods, sortMethodsNames, SortingOptions } from "@lib/sort";
import { useStore } from "@lib/store";
import { cn } from "@lib/utils";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  IconArrowsSort,
  IconCalendarPlus,
  IconCalendarTime,
  IconChevronUp,
  IconStar,
  IconX,
} from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { Button } from "@ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { useState } from "react";

function App() {
  const { tasks } = useStore();

  const defaultSorting: SortingOptions = {
    fn: "sortTasksByImportance",
    order: "desc",
  };
  const [sorting, setSorting] = useState<SortingOptions>(defaultSorting);

  const notFinishedTasks = tasks
    .filter((x) => !x.isCompleted)
    .sort((a, b) => {
      if (sorting.order === "asc") return sortMethods[sorting.fn](a, b);
      return sortMethods[sorting.fn](b, a);
    });

  const finishedTasks = tasks
    .filter((x) => x.isCompleted)
    .sort((a, b) => {
      if (sorting.order === "asc") return sortMethods[sorting.fn](a, b);
      return sortMethods[sorting.fn](b, a);
    });

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
        <button onClick={() => setSorting(defaultSorting)}>
          <IconX size={20} className="stroke-1" />
        </button>
      </div>

      <Form />

      {notFinishedTasks.length > 0 && (
        <ul className="z-[1] flex flex-col gap-y-2">
          {notFinishedTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </ul>
      )}

      {finishedTasks.length > 0 && (
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="finished-tasks">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-x-4 text-sm">
                <h3>Completed</h3>
                <span className="font-normal text-neutral-600">
                  {finishedTasks.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-y-2">
                {finishedTasks.map((task) => (
                  <Task key={task.id} {...task} />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}

export default App;
