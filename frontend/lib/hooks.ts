import { createTask, updateTask } from "@api/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useStore } from "./store";

function useCreateTaskMutation() {
  const { addTaskReducer } = useStore();

  return useMutation({
    mutationFn: (req: Parameters<typeof createTask>[0]) => createTask(req),
    onSuccess(data) {
      toast.success("Task created successfully", {
        id: "taskCreated",
      });
      addTaskReducer(data);
    },
    onError() {
      toast.error("Failed to create task", {
        id: "taskCreated",
      });
    },
  });
}

function useUpdateTaskMutation() {
  const { updateTaskReducer } = useStore();

  return useMutation({
    mutationFn: (req: Parameters<typeof updateTask>[0]) => updateTask(req),
    onSuccess(data) {
      toast.success("Task updated successfully", {
        id: "taskUpdated",
      });
      updateTaskReducer(data);
    },
    onError() {
      toast.error("Failed to update task", {
        id: "taskUpdated",
      });
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation };
