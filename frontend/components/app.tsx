"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { sortMethods, SortMethodsTypes } from "@lib/sort";
import { useStore } from "@lib/store";
import {
  IconArrowsSort,
  IconCalendarPlus,
  IconCalendarTime,
  IconChevronRight,
  IconStar,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";
import Form from "./form";
import Task from "./task";

function App() {
  const { tasks } = useStore();
  const defaultSortingFn: SortMethodsTypes = "sortTasksByImportance";
  const [sortingFn, setSortingFn] =
    useState<SortMethodsTypes>(defaultSortingFn);

  const notFinishedTasks = tasks
    .filter((x) => !x.isCompleted)
    .sort(sortMethods[sortingFn]);

  const finishedTasks = tasks
    .filter((x) => x.isCompleted)
    .sort(sortMethods[sortingFn]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-3 text-xl font-bold">Tasks</h1>

        <Menu as="div" className="relative">
          <Menu.Button className="px-3 py-1">
            <IconArrowsSort size={22} className="stroke-1" />
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
            <Menu.Items className="absolute top-0 right-0 z-10 mt-8 min-w-[200px] rounded bg-white py-2 text-sm text-black shadow-xl">
              <p className="mb-2 border-b px-2 pt-2 pb-3 text-center font-semibold">
                Sort by
              </p>

              <ul>
                <Menu.Item as="li">
                  <button
                    className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100"
                    onClick={() => setSortingFn("sortTasksByImportance")}
                  >
                    <IconStar size={20} className="mx-2 stroke-1" />
                    <p className="mx-1 px-1 text-sm text-neutral-700">
                      Importance
                    </p>
                  </button>
                </Menu.Item>
                <Menu.Item as="li">
                  <button
                    className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100"
                    onClick={() => setSortingFn("sortTasksByDueDate")}
                  >
                    <IconCalendarTime size={20} className="mx-2 stroke-1" />
                    <p className="mx-1 px-1 text-sm text-neutral-700">
                      Due date
                    </p>
                  </button>
                </Menu.Item>
                <Menu.Item as="li">
                  <button
                    className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100"
                    onClick={() => setSortingFn("sortTasksByTitle")}
                  >
                    <IconArrowsSort size={20} className="mx-2 stroke-1" />
                    <p className="mx-1 px-1 text-sm text-neutral-700">
                      Alphabetically
                    </p>
                  </button>
                </Menu.Item>
                <Menu.Item as="li">
                  <button
                    className="flex h-[36px] w-full items-center px-4 hover:bg-neutral-100"
                    onClick={() => setSortingFn("sortTasksByCreationDate")}
                  >
                    <IconCalendarPlus size={20} className="mx-2 stroke-1" />
                    <p className="mx-1 px-1 text-sm text-neutral-700">
                      Creation date
                    </p>
                  </button>
                </Menu.Item>
              </ul>
            </Menu.Items>
          </Transition>
        </Menu>
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
        <Disclosure>
          <Disclosure.Button className="flex items-center gap-x-3 border-b border-neutral-300 py-2 text-sm ui-open:border-b-0">
            <IconChevronRight
              size={22}
              className="stroke-1 text-neutral-500 transition-transform ui-open:rotate-90 ui-open:transform"
            />
            <h3 className="p-2 font-semibold">Completed</h3>
            <span className="">{finishedTasks.length}</span>
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>
              <ul className="z-[1] flex flex-col gap-y-2">
                {finishedTasks.map((task) => (
                  <Task key={task.id} {...task} />
                ))}
              </ul>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      )}
    </>
  );
}

export default App;
