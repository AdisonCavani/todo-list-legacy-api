import type { TaskDto } from "@api/dtos/TaskDto";

function sortTasksByTitle(a: TaskDto, b: TaskDto): number {
  return a.title.localeCompare(b.title);
}

function sortTasksByDueDate(a: TaskDto, b: TaskDto): number {
  // No due date - sort by createdAt
  if (!a.dueDate && !b.dueDate)
    return Date.parse(a.createdAt) - Date.parse(b.createdAt);

  // A has dueDate, but B does not
  if (a.dueDate && !b.dueDate) return -1;

  // A does not have dueDate, but B does
  if (!a.dueDate && b.dueDate) return 1;

  // Both have due date
  const aDate = Date.parse(
    a.dueTime ? `${a.dueDate} ${a.dueTime}` : a.dueDate!
  );
  const bDate = Date.parse(
    b.dueTime ? `${b.dueDate} ${b.dueTime}` : b.dueDate!
  );

  return aDate - bDate;
}

// TODO: add important task do schema
function sortTasksByImportance(a: TaskDto, b: TaskDto): number {
  // if (a.important && !b.important) return -1;

  // if (!a.important && b.important) return 1;

  return sortTasksByDueDate(a, b);
}

function sortTasksByCreationDate(a: TaskDto, b: TaskDto): number {
  return Date.parse(a.createdAt) - Date.parse(b.createdAt);
}

export {
  sortTasksByTitle,
  sortTasksByDueDate,
  sortTasksByImportance,
  sortTasksByCreationDate,
};
