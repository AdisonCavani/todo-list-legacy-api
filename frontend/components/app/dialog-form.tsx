import type { TaskDto } from "@api/dtos/TaskDto";
import { Dialog, Transition } from "@headlessui/react";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@lib/hooks";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { Fragment, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;

  task: TaskDto;
};

function DialogForm({ isOpen, setIsOpen, task }: Props) {
  const { mutate: deleteTask, isLoading: deleteTaskLoading } =
    useDeleteTaskMutation();
  const { mutate: updateTask, isLoading: updateTaskLoading } =
    useUpdateTaskMutation();

  const [title, setTitle] = useState<typeof task.title>(task.title);
  const [description, setDescription] = useState<typeof task.description>(
    task.description
  );

  const isSubmitDisabled = title.trim().length <= 0;

  function handleOnSubmit() {
    updateTask({
      ...task,
      title: title,
      description: description,
    });

    setIsOpen(false);
  }

  function handleOnCancel() {
    setIsOpen(false);

    // TODO: reset state
    setTitle(task.title);
  }

  function handleOnDelete() {
    deleteTask({
      id: task.id,
    });

    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="" onClose={handleOnCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div aria-hidden="true" className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update task
                  </Dialog.Title>

                  <button
                    onClick={handleOnDelete}
                    className="rounded-md bg-red-100 p-[6px] text-red-900 hover:bg-red-200"
                  >
                    {deleteTaskLoading ? (
                      <IconLoader2 size={18} className="animate-spin" />
                    ) : (
                      <IconTrash size={18} />
                    )}
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-y-3">
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Do a homework"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="English p.84, ex.1-3"
                      value={description ?? undefined}
                      onChange={(event) => setDescription(event.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4 flex w-full gap-x-3">
                  <button
                    type="button"
                    disabled={isSubmitDisabled}
                    onClick={handleOnSubmit}
                    className="flex w-full items-center justify-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 disabled:cursor-not-allowed"
                  >
                    {updateTaskLoading ? (
                      <IconLoader2 size={16} className="animate-spin" />
                    ) : (
                      <p>Save</p>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleOnCancel}
                    className="flex w-full items-center justify-center rounded-md bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-300"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DialogForm;
