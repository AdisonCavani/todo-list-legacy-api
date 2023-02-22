"use client";

import { useRef } from "react";
import { useStore } from "@lib/store";
import type { TaskDto } from "@api/dtos/TaskDto";

type Props = {
  tasks: TaskDto[];
};

function StoreInitializer({ tasks }: Props) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useStore.setState({
      tasks: tasks,
    });
    initialized.current = true;
  }

  return null;
}

export default StoreInitializer;
