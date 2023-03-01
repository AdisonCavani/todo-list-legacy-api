import DateComponent from "./date";
import type { TaskDto } from "@api/dtos/TaskDto";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@lib/hooks";
import { cn } from "@lib/utils";
import {
  IconCalendarEvent,
  IconLoader2,
  IconNote,
  IconStar,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { MouseEventHandler, useState } from "react";

function Task(task: TaskDto) {
  const { title, description, dueDate, dueTime, isCompleted, isImportant } =
    task;
  const { mutate } = useUpdateTaskMutation();

  const [open, setOpen] = useState<boolean>(false);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    mutate({
      ...task,
      isCompleted: !isCompleted,
    });
  };

  const onImportantChange: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();

    mutate({
      ...task,
      isImportant: !isImportant,
    });
  };

  const { mutate: deleteTask, isLoading: deleteTaskLoading } =
    useDeleteTaskMutation();
  const { mutate: updateTask, isLoading: updateTaskLoading } =
    useUpdateTaskMutation();

  const [dialogTitle, setDialogTitle] = useState<string>(title);
  const [dialogDescription, setDialogDescription] = useState<string>(
    description ?? ""
  );

  const isSubmitDisabled = dialogTitle.trim().length <= 0;

  function handleOnSubmit() {
    updateTask({
      ...task,
      title: dialogTitle,
      description:
        dialogDescription.trim().length === 0 ? null : dialogDescription.trim(),
    });

    setOpen(false);
  }

  function handleOnDelete() {
    deleteTask({
      id: task.id,
    });

    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(event) => {
        if (event) {
          setDialogTitle(title);
          setDialogDescription(description ?? "");
        }

        setOpen(event);
      }}
    >
      <DialogTrigger asChild>
        <li className="group relative flex cursor-pointer flex-row items-center gap-x-2 rounded-md border-neutral-200 bg-white px-4 shadow-ms hover:bg-neutral-100">
          <button
            aria-label="Toggle task completion"
            onClick={handleOnClick}
            className={cn(
              "ml-[6px] min-h-[18px] min-w-[18px] cursor-pointer appearance-none rounded-full border border-neutral-400",
              isCompleted && "bg-neutral-400"
            )}
          />

          <div className="flex min-h-[52px] w-full flex-col justify-center py-2 px-4">
            <p
              className={`text-sm ${
                isCompleted
                  ? "text-neutral-500 line-through decoration-neutral-500"
                  : "text-black no-underline"
              }`}
            >
              {title}
            </p>

            <div className="flex items-center gap-x-3">
              {dueDate && dueTime && (
                <DateComponent
                  date={new Date(`${dueDate} ${dueTime}`)}
                  icon={<IconCalendarEvent size={13} />}
                  textCss="text-xs"
                  withTime={true}
                />
              )}
              {dueDate && !dueTime && (
                <DateComponent
                  date={new Date(dueDate)}
                  icon={<IconCalendarEvent size={13} />}
                  textCss="text-xs"
                />
              )}

              {description && (
                <IconNote size={13} className="text-neutral-600" />
              )}
            </div>
          </div>

          <button
            aria-label="Toggle task importance"
            onClick={onImportantChange}
          >
            {isImportant ? (
              <IconStarFilled size={18} className="text-yellow-400" />
            ) : (
              <IconStar size={18} className="text-neutral-400" />
            )}
          </button>
        </li>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between">
            <DialogTitle>Update task</DialogTitle>
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
          <DialogDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-y-3">
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
              value={dialogTitle}
              onChange={(event) => setDialogTitle(event.target.value)}
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
              placeholder="Student's book, p.84, ex.1-3"
              value={dialogDescription}
              onChange={(event) => setDialogDescription(event.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none"
            />
          </div>
        </div>

        <DialogFooter>
          <button
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
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-md bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-300"
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Task;
