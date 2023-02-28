import DateComponent from "./date";
import DialogForm from "./dialog-form";
import type { TaskDto } from "@api/dtos/TaskDto";
import { useUpdateTaskMutation } from "@lib/hooks";
import {
  IconCalendarEvent,
  IconNote,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

function Task(task: TaskDto) {
  const { id, title, description, dueDate, dueTime, isCompleted, isImportant } =
    task;
  const { mutate } = useUpdateTaskMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCompletedChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
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

  return (
    <>
      <li
        className="group relative flex cursor-pointer flex-row items-center gap-x-2 rounded-md border-neutral-200 bg-white px-4 shadow-ms hover:bg-neutral-200/50"
        onClick={() => setIsOpen(true)}
      >
        <input
          id={id}
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompletedChange}
          className="ml-[6px] min-h-[18px] min-w-[18px] cursor-pointer appearance-none rounded-full border border-neutral-400 checked:bg-neutral-400"
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

            {description && <IconNote size={13} className="text-neutral-600" />}
          </div>
        </div>

        <button onClick={onImportantChange}>
          {isImportant ? (
            <IconStarFilled size={18} className="text-yellow-400" />
          ) : (
            <IconStar size={18} className="text-neutral-400" />
          )}
        </button>
      </li>

      <DialogForm isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
    </>
  );
}

export default Task;
