import type { TaskPriorityEnum } from "./types";
import { cn } from "./utils";

export const isUrlInternal = (href: string) =>
  href && (href.startsWith("/") || href.startsWith("#"));

// TODO: refactor this
export function getPriorityText(priority: TaskPriorityEnum, long?: boolean) {
  const prefix = long ? "Priority " : "P";

  switch (priority) {
    case "P1":
      return prefix + 1;
    case "P2":
      return prefix + 2;
    case "P3":
      return prefix + 3;
    default:
      return "Set priority";
  }
}

// TODO: refactor this
export function getPriorityColor(priority: TaskPriorityEnum) {
  switch (priority) {
    case "P3":
      return cn("text-blue-500");
    case "P2":
      return cn("text-orange-400");
    case "P1":
      return cn("text-red-500");
    default:
      throw new Error("Out of range");
  }
}
