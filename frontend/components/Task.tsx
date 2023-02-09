import { updateTask } from "@api/client";
import type { TaskDto } from "@api/dtos/TaskDto";
import type { AppDispatch } from "@lib/store";
import { updateTaskReducer } from "@lib/taskSlice";
import { IconCalendarEvent, IconStar } from "@tabler/icons-react";
import type { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import DateComponent from "./Date";

function Task({
  id,
  title,
  description,
  dueDate,
  dueTime,
  isCompleted,
}: TaskDto) {
  const dispatch = useDispatch<AppDispatch>();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const task = await updateTask({
      id: id,
      title: title,
      description: description,
      dueDate: dueDate,
      dueTime: dueTime,
      isCompleted: e.target.checked,
    });

    dispatch(updateTaskReducer(task));
  }

  return (
    <li className="group relative flex flex-row items-center gap-x-2 rounded-md border-neutral-200 bg-white px-4 shadow-md">
      <input
        id={id}
        type="checkbox"
        checked={isCompleted}
        onChange={handleChange}
        className="ml-[6px] min-h-[18px] min-w-[18px] cursor-pointer appearance-none rounded-full border border-neutral-400 checked:bg-neutral-400"
      />

      <div className="flex min-h-[52px] w-full flex-col justify-center py-2 px-4">
        <label
          htmlFor={id}
          className={`text-sm ${
            isCompleted
              ? "text-neutral-500 line-through decoration-neutral-500"
              : "text-black no-underline"
          }`}
        >
          {title}
        </label>

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
      </div>

      <button className="text-neutral-400">
        <IconStar size={18} />
        {/* <IconStarFilled /> */}
      </button>
    </li>
  );
}

export default Task;