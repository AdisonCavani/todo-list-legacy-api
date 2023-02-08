import type { TaskDto } from "@api/dtos/TaskDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type TaskState = {
  items: TaskDto[];
};

const initialState: TaskState = {
  items: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskDto>) => {
      const keys = new Set(state.items.map((task) => task.id));

      if (keys.has(action.payload.id))
        console.warn(
          `Cannot add task (id: ${action.payload.id}), because it's already in the slice`
        );
      else state.items = [...state.items, action.payload];
    },
    addTasks: (state, action: PayloadAction<TaskDto[]>) => {
      const keys = new Set(state.items.map((task) => task.id));

      action.payload.map((task) => {
        if (!keys.has(task.id)) state.items.push(task);
      });
    },
    removeTask: (state, action: PayloadAction<TaskDto>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newArr = [...state.items];

      if (index >= 0) newArr.splice(index, 1);
      else
        console.warn(
          `Cannot remove task (id: ${action.payload.id}), because it's not in the slice`
        );

      state.items = newArr;
    },
  },
});

export const { addTask, addTasks, removeTask } = taskSlice.actions;

// Selectors - pull information from the Global store slice
export const selectTasks = (state: RootState) => state.task.items;

export default taskSlice.reducer;
