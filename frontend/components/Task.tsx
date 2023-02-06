import { updateTask } from "@api/client";
import type { TaskDto } from "@api/dtos/TaskDto";
import { IconCalendarEvent } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";

function Task({
  id,
  title,
  description,
  dueDate,
  dueTime,
  isCompleted,
}: TaskDto) {
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
    <div className="flex flex-row gap-x-2 border-b border-neutral-200">
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
    </div>
  );
}

function displayTime(dueDate: string | undefined, dueTime: string | undefined) {
  if (!dueDate && !dueTime) return undefined;

  const options: Intl.RelativeTimeFormatOptions = {
    localeMatcher: "best fit",
    numeric: "auto",
  };

  // Date and time
  if (dueDate && dueTime) {
    const date = new Date(`${dueDate} ${dueTime}`);
    const today = Date.now();

    const diff = Math.floor((date.getTime() - today) / (1000 * 60 * 60 * 24));
    const relative = new Intl.RelativeTimeFormat("en-US", options).format(
      diff,
      "day"
    );

    const dateString = relative.charAt(0).toUpperCase() + relative.slice(1);

    const timeString = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    return styleTime(`${dateString} ${timeString}`, diff);
  }

  // Date only
  else if (dueDate && !dueTime) {
    const date = new Date(dueDate);
    const today = Date.now();

    const diff =
      Math.floor((date.getTime() - today) / (1000 * 60 * 60 * 24)) + 1;

    const relative = new Intl.RelativeTimeFormat("en-US", options).format(
      diff,
      "day"
    );

    const dateString = relative.charAt(0).toUpperCase() + relative.slice(1);

    return styleTime(dateString, diff);
  }

  // TODO: this shouldn't happen
  // Time only
  else {
    throw new Error("Invalid date format - only time specified!");
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
