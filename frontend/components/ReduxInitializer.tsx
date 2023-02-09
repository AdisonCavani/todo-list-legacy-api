"use client";

import type { TaskDto } from "@api/dtos/TaskDto";
import type { AppDispatch } from "@lib/store";
import { addTasksReducer } from "@lib/taskSlice";
import { useRef } from "react";
import { useDispatch } from "react-redux";

type Props = {
  tasks: TaskDto[];
};

function ReduxInitializer({ tasks }: Props) {
  const initialized = useRef<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  if (!initialized.current) {
    console.log("hit");

    dispatch(addTasksReducer(tasks));
    initialized.current = true;
  }

  return null;
}

export default ReduxInitializer;
