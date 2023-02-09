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
    addTaskReducer: (state, action: PayloadAction<TaskDto>) => {
      const keys = new Set(state.items.map((task) => task.id));

      if (keys.has(action.payload.id))
        console.warn(
          `Cannot add task (id: ${action.payload.id}), because it's already in the slice`
        );
      else state.items = [...state.items, action.payload];
    },
    addTasksReducer: (state, action: PayloadAction<TaskDto[]>) => {
      const keys = new Set(state.items.map((task) => task.id));

      action.payload.forEach((task) => {
        if (!keys.has(task.id)) state.items.push(task);
      });
    },
    removeTaskReducer: (state, action: PayloadAction<TaskDto>) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );

      let newArr = [...state.items];

      if (index >= 0) newArr.splice(index, 1);
      else
        console.warn(
          `Cannot remove task (id: ${action.payload.id}), because it's not in the slice`
        );

      state.items = newArr;
    },
    updateTaskReducer: (state, action: PayloadAction<TaskDto>) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index >= 0) state.items[index] = action.payload;
      else
        console.warn(
          `Cannot update task (id: ${action.payload.id}), because it's not in the slice`
        );
    },
  },
});

export const {
  addTaskReducer,
  addTasksReducer,
  removeTaskReducer,
  updateTaskReducer,
} = taskSlice.actions;

// Selectors - pull information from the Global store slice
export const selectTasks = (state: RootState) => state.task.items;

export default taskSlice.reducer;
