"use client";

import type { TaskDto } from "@api/dtos/TaskDto";
import { useStore } from "@lib/store";
import { useRef } from "react";

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
