"use client";

import DateComponent from "./date";
import { useToast } from "@hooks/use-toast";
import { useCreateTaskMutation } from "@lib/hooks";
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
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { createRef, useState } from "react";

function Form() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const { mutate, isLoading } = useCreateTaskMutation();
  const submitDisabled = title.trim().length === 0 || isLoading;

  const { toast } = useToast();

  async function handleOnSubmit() {
    mutate({
      title: title,
      dueDate: date?.toISOString().split("T")[0],
    });

    setTitle("");
    setDate(undefined);
  }

  function handleNotSupportedFeature() {
    toast({
      title: "This feature is not available yet.",
      description: "Work in progress. Sorry for the inconvenience.",
    });
  }

  const dateRef = createRef<HTMLInputElement>();

  return (
    <div className="z-[2] mb-3 rounded-md border-neutral-200 bg-white shadow-ms">
      <div className="flex flex-row items-center gap-x-2 px-4">
        <button className="ml-[6px] min-h-[18px] min-w-[18px] cursor-pointer rounded-full border border-neutral-400" />
        <input
          placeholder="Add a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block min-h-[52px] w-full px-4 py-2 text-sm outline-none placeholder:text-neutral-600"
        />
      </div>

      <div className="flex h-11 items-center justify-between rounded-b-md border-t border-neutral-300 bg-neutral-50 px-4">
        <div className="relative flex flex-row items-center gap-x-2 text-neutral-500">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            ref={dateRef}
            value={date?.toISOString().split("T")[0]}
            onChange={(event) => setDate(event.target.valueAsDate ?? undefined)}
            className="invisible absolute top-0 left-0 mt-9 -ml-1 h-0 w-0"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={date ? "outline" : "ghost"} size="xxs">
                <IconCalendarEvent size={20} />
                {date && (
                  <DateComponent
                    date={date}
                    textCss="text-xs font-semibold ml-2"
                  />
                )}
              </Button>
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

              <DropdownMenuItem onClick={() => dateRef.current?.showPicker()}>
                <IconCalendarStats className="mr-2 h-4 w-4" />
                <span>Pick a date</span>
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

          <Button
            variant="ghost"
            size="xxs"
            onClick={handleNotSupportedFeature}
          >
            <IconBell size={20} />
          </Button>

          <Button
            variant="ghost"
            size="xxs"
            onClick={handleNotSupportedFeature}
          >
            <IconRepeat size={20} />
          </Button>
        </div>
        <Button
          disabled={submitDisabled}
          onClick={handleOnSubmit}
          size="xs"
          variant="outline"
        >
          {isLoading && <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add
        </Button>
      </div>
    </div>
  );
}

export default Form;
