import type { TaskDto } from "@api/dtos/TaskDto";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@hooks/redux";
import { cn } from "@lib/utils";
import {
  IconCalendar,
  IconCalendarDue,
  IconCalendarEvent,
  IconCalendarPlus,
  IconCalendarStats,
  IconLoader2,
  IconNote,
  IconStar,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import {
  createRef,
  forwardRef,
  LegacyRef,
  MouseEventHandler,
  useState,
} from "react";
import DateComponent from "./date";

const Task = forwardRef((task: TaskDto, ref) => {
  const { title, description, dueDate, isCompleted, isImportant } = task;
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
  const [dialogDate, setDialogDate] = useState<Date | null>(
    dueDate ? new Date(dueDate) : null
  );

  const dialogDateRef = createRef<HTMLInputElement>();

  const isSubmitDisabled = dialogTitle.trim().length <= 0;

  function handleOnSubmit() {
    updateTask({
      ...task,
      title: dialogTitle,
      description:
        dialogDescription.trim().length === 0 ? null : dialogDescription.trim(),
      dueDate: dialogDate?.toISOString().split("T")[0],
    });

    setOpen(false);
  }

  function handleOnDelete() {
    deleteTask(task.id);

    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(event) => {
        if (event) {
          setDialogTitle(title);
          setDialogDescription(description ?? "");
          setDialogDate(dueDate ? new Date(dueDate) : null);
        }

        setOpen(event);
      }}
    >
      <DialogTrigger asChild>
        <li
          ref={ref as LegacyRef<HTMLLIElement>}
          className="flex cursor-pointer flex-row items-center gap-x-2 rounded-md bg-white px-4 shadow-ms hover:bg-neutral-100 dark:bg-neutral-800"
        >
          <button
            aria-label="Toggle task completion"
            onClick={handleOnClick}
            className={cn(
              "ml-[6px] min-h-[18px] min-w-[18px] cursor-pointer appearance-none rounded-full border border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-neutral-500",
              isCompleted && "bg-neutral-400 dark:bg-neutral-500"
            )}
          />

          <div className="flex min-h-[52px] w-full flex-col justify-center px-4 py-2">
            <p
              className={`text-sm ${
                isCompleted
                  ? "text-neutral-500 line-through decoration-neutral-500"
                  : "no-underline"
              }`}
            >
              {title}
            </p>

            <div className="flex items-center">
              {dueDate && (
                <DateComponent
                  className={cn(
                    description &&
                      "after:mx-1 after:text-xs after:leading-none after:text-neutral-500 after:content-['•'] after:dark:text-neutral-400"
                  )}
                  date={new Date(dueDate)}
                  icon={<IconCalendarEvent size={13} />}
                  textCss="text-xs"
                />
              )}

              {description && (
                <IconNote
                  size={13}
                  className={cn("text-neutral-600 dark:text-neutral-300")}
                />
              )}
            </div>
          </div>

          <button
            aria-label="Toggle task importance"
            onClick={onImportantChange}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isImportant ? (
              <IconStarFilled size={18} className="text-yellow-400" />
            ) : (
              <IconStar
                size={18}
                className="text-neutral-400 dark:text-neutral-500"
              />
            )}
          </button>
        </li>
      </DialogTrigger>

      <DialogContent className="dark:bg-neutral-800">
        <DialogHeader>
          <div className="flex justify-between">
            <DialogTitle>Update task</DialogTitle>
            <Button
              size="xs"
              loading={deleteTaskLoading}
              icon={<IconTrash size={18} />}
              variant="destructive"
              onClick={handleOnDelete}
            />
          </div>
          <DialogDescription>
            Make changes to your task here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-y-3">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Do a homework"
              value={dialogTitle}
              onChange={(event) => setDialogTitle(event.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Student's book, p.84, ex.1-3"
              value={dialogDescription}
              onChange={(event) => setDialogDescription(event.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              ref={dialogDateRef}
              value={dialogDate?.toISOString().split("T")[0] ?? ""}
              onChange={(event) => setDialogDate(event.target.valueAsDate)}
              className="invisible absolute left-0 top-0 -ml-1 mt-9 h-0 w-0"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Due Date"
                  variant="outline"
                  className="w-full"
                >
                  <IconCalendarEvent className="h-4 w-4" />
                  {dialogDate ? (
                    <DateComponent date={dialogDate} textCss="font-semibold" />
                  ) : (
                    "Add due date"
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Due Date</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setDialogDate(new Date())}>
                  <IconCalendar className="h-5 w-5" />
                  <div className="flex w-full justify-between">
                    <span>Today</span>
                    <span className="pl-8 text-neutral-500">Wed</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    const date = new Date();
                    date.setDate(date.getDate() + 1);
                    setDialogDate(date);
                  }}
                >
                  <IconCalendarDue className="h-5 w-5" />
                  <div className="flex w-full justify-between">
                    <span>Tomorrow</span>
                    <span className="pl-8 text-neutral-500">Thu</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    const date = new Date();
                    date.setDate(date.getDate() + 7);
                    setDialogDate(date);
                  }}
                >
                  <IconCalendarPlus className="h-5 w-5" />
                  <div className="flex w-full justify-between">
                    <span>Next week</span>
                    <span className="pl-8 text-neutral-500">Mon</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => dialogDateRef.current?.showPicker()}
                >
                  <IconCalendarStats className="h-4 w-4" />
                  <span>Pick a date</span>
                </DropdownMenuItem>

                {dialogDate && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => setDialogDate(null)}
                      className="text-red-600 dark:text-red-400"
                    >
                      <IconTrash size={24} className="h-4 w-4" />
                      <span>Remove due date</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="blue"
            disabled={isSubmitDisabled}
            onClick={handleOnSubmit}
            className="w-full"
          >
            {updateTaskLoading ? (
              <IconLoader2 size={16} className="animate-spin" />
            ) : (
              <p>Save</p>
            )}
          </Button>
          <Button
            variant="subtle"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

Task.displayName = "Task";

export default Task;
