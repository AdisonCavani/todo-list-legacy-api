"use client";

import type { TaskDto } from "@api/dtos/TaskDto";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";
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

  function handleOnDragEnd(result: DropResult, _: ResponderProvided) {
    if (!result.destination) return;

    const myArr = Array.from(items);
    const [reorderedItem] = myArr.splice(result.source.index, 1);
    myArr.splice(result.destination.index, 0, reorderedItem!);

    setItems(myArr);
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Tasks</h1>

      <Form callback={callbackFn} />

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="group relative flex flex-row gap-x-2 border-b border-neutral-200"
                    >
                      <Task
                        dragHandleProps={provided.dragHandleProps}
                        task={task}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
