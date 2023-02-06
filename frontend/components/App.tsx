"use client";

import type { TaskDto } from "@api/dtos/TaskDto";
import { useEffect, useState } from "react";
import Form from "./Form";
import Task from "./Task";

interface Props {
  tasks: TaskDto[];
}

function App({ tasks }: Props) {
  const [items, setItems] = useState<TaskDto[]>([]);

  useEffect(() => {
    setItems(tasks);
  }, [tasks]);

  function callbackFn(newTask: TaskDto) {
    setItems([...items, newTask]);
  }

  return (
    <>
      <Form callback={callbackFn} />

      <div>
        {items.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </>
  );
}

export default App;
