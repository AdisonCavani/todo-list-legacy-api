import { updateTask } from "@api/client";
import type { TaskDto } from "@api/dtos/TaskDto";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { IconCalendarEvent, IconGripVertical } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";

type Props = {
  task: TaskDto;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
};

function Task({ dragHandleProps, task }: Props) {
  const { id, title, description, dueDate, dueTime, isCompleted } = task;
  const [completed, setCompleted] = useState<boolean>(isCompleted);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCompleted(e.target.checked);

    await updateTask({
      id: id,
      title: title,
      description: description,
      dueDate: dueDate,
      dueTime: dueTime,
      isCompleted: e.target.checked,
    });
  }

  return (
    <>
      <div
        {...dragHandleProps}
        className="group/icon absolute flex h-6 w-6 cursor-move items-center justify-center rounded bg-transparent text-neutral-400 hover:visible hover:bg-neutral-200 hover:text-black active:invisible group-hover:visible"
        style={{ top: "7px", left: "-30px" }}
      >
        <IconGripVertical
          size={20}
          className="invisible group-hover:visible group-hover/icon:visible"
        />
      </div>

      <input
        id={id}
        type="checkbox"
        checked={completed}
        onChange={handleChange}
        className="mt-[10px] h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border border-neutral-400 checked:bg-neutral-400"
      />

      <div className="mr-6 flex flex-col gap-y-[2px] py-2">
        <label
          htmlFor={id}
          className={`text-sm ${
            completed
              ? "text-neutral-500 line-through decoration-neutral-500"
              : "text-black no-underline"
          }`}
        >
          {title}
        </label>

        {displayTime(dueDate, dueTime)}
      </div>
    </>
  );
}

function displayTime(dueDate: string | undefined, dueTime: string | undefined) {
  if (!dueDate && !dueTime) return undefined;

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  const weekendOpt: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  const currYearOpt: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };

  const otherOpt: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const date = new Date(dueTime ? `${dueDate} ${dueTime}` : dueDate!);
  const today = Date.now();

  const diff = Math.floor((date.getTime() - today) / (1000 * 60 * 60 * 24));

  // Today and tomorrow
  if (diff === 0 || diff === 1) {
    const relative = new Intl.RelativeTimeFormat("en-US", {
      localeMatcher: "best fit",
      numeric: "auto",
    }).format(diff, "day");
    const dateString = relative.charAt(0).toUpperCase() + relative.slice(1);
    const timeString = date.toLocaleTimeString("en-US", timeOptions);
    const str = dueTime ? `${dateString} ${timeString}` : dateString;
    return styleTime(str, diff);
  } else {
    let options = weekendOpt;

    if (diff < 7) options = weekendOpt;
    else if (date.getFullYear() === new Date().getFullYear())
      options = currYearOpt;
    else options = otherOpt;

    const dateString = Intl.DateTimeFormat("en-US", options).format(date);
    const timeString = date.toLocaleTimeString("en-US", timeOptions);
    const str = dueTime ? `${dateString} ${timeString}` : dateString;
    return styleTime(str, diff);
  }
}

function styleTime(date: string, diff: number) {
  let colorClass = "";

  // In the past
  if (diff < 0) colorClass = "text-red-700";
  // Today
  else if (diff === 0) colorClass = "text-green-700";
  // Tomorrow
  else if (diff === 1) colorClass = "text-orange-700";
  // This week
  else if (diff > 1 && diff <= 7) colorClass = "text-purple-700";
  // Other
  else colorClass = "text-neutral-500";

  return (
    <div className="flex items-center gap-x-1">
      <IconCalendarEvent size={13} className={colorClass} />
      <p className={`text-xs ${colorClass}`}>{date}</p>
    </div>
  );
}

export default Task;
