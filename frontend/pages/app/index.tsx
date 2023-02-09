import type { NextPage } from "next";
import { Disclosure, Transition } from "@headlessui/react";
import { sortTasksByDueDate } from "@lib/sort";
import { addTasksReducer, selectTasks } from "@lib/taskSlice";
import { IconChevronRight } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import Form from "@components/Form";
import Task from "@components/Task";
import { useEffect } from "react";
import { listTasks } from "@api/client";
import AppLayout from "layouts/app/layout";

const AppPage: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function get() {
      const res = await listTasks({
        page: 1,
        pageSize: 25,
      });

      dispatch(addTasksReducer(res.data));
    }
    get();
  }, [dispatch]);

  const items = useSelector(selectTasks);

  const notFinishedTasks = items
    .filter((x) => !x.isCompleted)
    .sort(sortTasksByDueDate);

  const finishedTasks = items
    .filter((x) => x.isCompleted)
    .sort(sortTasksByDueDate);

  return (
    <AppLayout>
      <section className="mx-auto flex max-w-7xl flex-col gap-y-2">
        <h1 className="mb-3 text-xl font-bold">Tasks</h1>

        <Form />

        <ul className="z-[1] flex flex-col gap-y-2">
          {notFinishedTasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </ul>

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
      </section>
    </AppLayout>
  );
};

export default AppPage;
