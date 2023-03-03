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

function sortTasksByImportance(a: TaskDto, b: TaskDto): number {
  if (a.isImportant && !b.isImportant) return 1;

  if (!a.isImportant && b.isImportant) return -1;

  return sortTasksByDueDate(b, a);
}

function sortTasksByCreationDate(a: TaskDto, b: TaskDto): number {
  return Date.parse(a.createdAt) - Date.parse(b.createdAt);
}

export const sortMethods = {
  sortTasksByTitle,
  sortTasksByDueDate,
  sortTasksByImportance,
  sortTasksByCreationDate,
};

export const sortMethodsNames = {
  sortTasksByTitle: "alphabetically",
  sortTasksByDueDate: "by due date",
  sortTasksByImportance: "by importance",
  sortTasksByCreationDate: "by creation date",
};

type SortMethodsTypes = keyof typeof sortMethods;
export type SortingOptions = {
  fn: SortMethodsTypes;
  order: "asc" | "desc";
};
