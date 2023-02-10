import { createTask, updateTask } from "@api/client";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "./store";

function useCreateTaskMutation() {
  const { addTaskReducer } = useStore();

  return useMutation({
    mutationFn: (req: Parameters<typeof createTask>[0]) => createTask(req),
    onSuccess(data) {
      addTaskReducer(data);
    },
  });
}

function useUpdateTaskMutation() {
  const { updateTaskReducer } = useStore();

  return useMutation({
    mutationFn: (req: Parameters<typeof updateTask>[0]) => updateTask(req),
    onSuccess(data) {
      updateTaskReducer(data);
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation };
