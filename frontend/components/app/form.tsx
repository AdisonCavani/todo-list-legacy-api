"use client";

import DateComponent from "./date";
import { Menu, Transition } from "@headlessui/react";
import { useCreateTaskMutation } from "@lib/hooks";
import { cn } from "@lib/utils";
import {
  IconBell,
  IconCalendarEvent,
  IconLoader2,
  IconRepeat,
  IconTrash,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";

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
          <Menu as="div" className="relative">
            <Menu.Button
              className={cn(
                "flex items-center gap-x-2 rounded p-1 hover:bg-neutral-200",
                date && "border bg-white"
              )}
            >
              <IconCalendarEvent size={20} />
              {date && (
                <DateComponent date={date} textCss="text-xs font-semibold" />
              )}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute top-0 left-0 z-10 mt-8 min-w-[200px] rounded bg-white py-2 text-sm text-black shadow-xl">
                <p className="mb-2 border-b px-2 pt-2 pb-3 text-center font-semibold">
                  Due
                </p>

                <ul>
                  <Menu.Item as="li" className="min-h-[38px]">
                    <button
                      className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100"
                      onClick={() => setDate(new Date())}
                    >
                      <IconCalendarEvent size={24} className="mx-2 stroke-1" />
                      <div className="flex w-full justify-between">
                        <p className="mx-1 px-1 text-sm text-neutral-700">
                          Today
                        </p>
                        <p className="pl-5 text-right text-sm text-neutral-500">
                          Wed
                        </p>
                      </div>
                    </button>
                  </Menu.Item>
                  <Menu.Item as="li" className="min-h-[38px]">
                    <button
                      className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100"
                      onClick={() => {
                        const date = new Date();
                        date.setDate(date.getDate() + 1);
                        setDate(date);
                      }}
                    >
                      <IconCalendarEvent size={24} className="mx-2 stroke-1" />
                      <div className="flex w-full justify-between">
                        <p className="mx-1 px-1 text-sm text-neutral-700">
                          Tomorrow
                        </p>
                        <p className="pl-5 text-right text-sm text-neutral-500">
                          Thu
                        </p>
                      </div>
                    </button>
                  </Menu.Item>
                  <Menu.Item
                    as="li"
                    className="min-h-[38px]"
                    onClick={() => {
                      const date = new Date();
                      date.setDate(date.getDate() + 7);
                      setDate(date);
                    }}
                  >
                    <button className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100">
                      <IconCalendarEvent size={24} className="mx-2 stroke-1" />
                      <div className="flex w-full justify-between">
                        <p className="mx-1 px-1 text-sm text-neutral-700">
                          Next week
                        </p>
                        <p className="pl-5 text-right text-sm text-neutral-500">
                          Mon
                        </p>
                      </div>
                    </button>
                  </Menu.Item>
                  <li role="separator" className="my-2 border-b" />
                  <Menu.Item as="li" className="min-h-[38px]">
                    <button className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100">
                      <IconCalendarEvent size={24} className="mx-2 stroke-1" />
                      <div className="flex w-full justify-between">
                        <p className="mx-1 px-1 text-sm text-neutral-700">
                          Pick a date
                        </p>
                      </div>
                    </button>
                  </Menu.Item>

                  {date && <li role="separator" className="my-2 border-b" />}
                  {date && (
                    <Menu.Item as="li" className="min-h-[38px]">
                      <button
                        className="flex h-[36px] w-full items-center px-4 text-red-600 hover:bg-neutral-100"
                        onClick={() => setDate(undefined)}
                      >
                        <IconTrash size={24} className="mx-2 stroke-1" />
                        <div className="flex w-full">
                          <p className="mx-1 px-1 text-sm">Remove due date</p>
                        </div>
                      </button>
                    </Menu.Item>
                  )}
                </ul>
              </Menu.Items>
            </Transition>
          </Menu>

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
