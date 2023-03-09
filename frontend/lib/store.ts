import type { TaskDto } from "@api/dtos/TaskDto";
import { create } from "zustand";

type State = {
  tasks: TaskDto[];
  addTaskReducer: (payloadTask: TaskDto) => void;
  updateTaskReducer: (payloadTask: TaskDto) => void;
  replaceTaskReducer: (payload: {
    taskId: string;
    payloadTask: TaskDto;
  }) => void;
  deleteTaskReducer: (id: string) => void;
};

export const useStore = create<State>((set) => ({
  tasks: [],
  addTaskReducer: (payloadTask) =>
    set((state) => ({
      ...state,
      tasks: addTask(state.tasks, payloadTask),
    })),
  updateTaskReducer: (payloadTask) =>
    set((state) => ({
      ...state,
      tasks: updateTask(state.tasks, payloadTask),
    })),
  deleteTaskReducer: (id) =>
    set((state) => ({
      ...state,
      tasks: deleteTask(state.tasks, id),
    })),
  replaceTaskReducer({ taskId, payloadTask }) {
    set((state) => ({
      ...state,
      tasks: replaceTask(state.tasks, taskId, payloadTask),
    }));
  },
}));

function addTask(tasks: TaskDto[], payloadTask: TaskDto) {
  const keys = new Set(tasks.map((task) => task.id));

  if (!keys.has(payloadTask.id)) return [...tasks, payloadTask];

  console.warn(
    `Cannot add task (id: ${payloadTask.id}), because it's already in the slice`
  );
  return tasks;
}

function updateTask(tasks: TaskDto[], payloadTask: TaskDto) {
  const index = tasks.findIndex((task) => task.id === payloadTask.id);

  if (index >= 0) {
    tasks[index] = payloadTask;
    return tasks;
  }

  console.warn(
    `Cannot update task (id: ${payloadTask.id}), because it's not in the slice`
  );

  return tasks;
}

function deleteTask(tasks: TaskDto[], id: string) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index >= 0) tasks.splice(index, 1);
  else
    console.warn(
      `Cannot remove task (id: ${id}), because it's not in the slice`
    );

  return tasks;
}

function replaceTask(tasks: TaskDto[], taskId: string, task: TaskDto) {
  const index = tasks.findIndex((task) => task.id === taskId);
  tasks[index] = task;

  return tasks;
}
