"use client";

import DateComponent from "./date";
import { useCreateTaskMutation } from "@lib/hooks";
import { cn } from "@lib/utils";
import {
  IconBell,
  IconCalendar,
  IconCalendarDue,
  IconCalendarEvent,
  IconCalendarPlus,
  IconCalendarStats,
  IconLoader2,
  IconRepeat,
  IconTrash,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { useState } from "react";

function Form() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const { mutate, isLoading } = useCreateTaskMutation();
  const submitDisabled = title.trim().length === 0 || isLoading;

  async function handleOnSubmit() {
    mutate({
      title: title,
      dueDate: date?.toISOString().split("T")[0],
    });

    setTitle("");
    setDate(undefined);
  }

  return (
    <div className="z-[2] mb-3 rounded-md border-neutral-200 bg-white shadow-ms">
      <div className="flex flex-row items-center gap-x-2 px-4">
        <button className="text-neutral-400">
          <div className="ml-[6px] min-h-[18px] min-w-[18px] cursor-pointer rounded-full border border-neutral-400"></div>
        </button>
        <input
          placeholder="Add a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block min-h-[52px] w-full px-4 py-2 text-sm outline-none placeholder:text-neutral-600"
        />
      </div>

      <div className="flex h-11 items-center justify-between rounded-b-md border-t border-neutral-300 bg-neutral-50 px-4">
        <div className="flex flex-row items-center gap-x-2 text-neutral-500">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-x-2 rounded p-1 hover:bg-neutral-200",
                date && "border bg-white"
              )}
            >
              <IconCalendarEvent size={20} />
              {date && (
                <DateComponent date={date} textCss="text-xs font-semibold" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" alignOffset={-30}>
              <DropdownMenuLabel>Due Date</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setDate(new Date())}>
                <IconCalendar className="mr-2 h-5 w-5" />
                <div className="flex w-full justify-between">
                  <span>Today</span>
                  <span className="pl-8 text-neutral-500">Wed</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  const date = new Date();
                  date.setDate(date.getDate() + 1);
                  setDate(date);
                }}
              >
                <IconCalendarDue className="mr-2 h-5 w-5" />
                <div className="flex w-full justify-between">
                  <span>Tomorrow</span>
                  <span className="pl-8 text-neutral-500">Thu</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  const date = new Date();
                  date.setDate(date.getDate() + 7);
                  setDate(date);
                }}
              >
                <IconCalendarPlus className="mr-2 h-5 w-5" />
                <div className="flex w-full justify-between">
                  <span>Next week</span>
                  <span className="pl-8 text-neutral-500">Mon</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <IconCalendarStats className="mr-2 h-4 w-4" />
                <span className="text-neutral-700">Pick a date</span>
              </DropdownMenuItem>

              {date && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => setDate(undefined)}
                    className="text-red-600"
                  >
                    <IconTrash size={24} className="mr-2 h-4 w-4" />
                    <span>Remove due date</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="flex items-center rounded p-1 hover:bg-neutral-200">
            <IconBell size={20} />
          </button>

          <button className="flex items-center rounded p-1 hover:bg-neutral-200">
            <IconRepeat size={20} />
          </button>
        </div>
        <button
          disabled={submitDisabled}
          onClick={handleOnSubmit}
          className="border bg-white py-[6px] px-2 text-xs font-semibold disabled:cursor-not-allowed disabled:text-neutral-400"
        >
          {isLoading ? (
            <IconLoader2 size={16} className="mx-1 animate-spin" />
          ) : (
            <p className="mx-[1px]">Add</p>
          )}
        </button>
      </div>
    </div>
  );
}

export default Form;
