import { createTask, updateTask } from "@api/client";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useStore } from "./store";

function useCreateTaskMutation() {
  const { addTaskReducer } = useStore();
  const session = useSession();

  return useMutation({
    mutationFn: (req: Parameters<typeof createTask>[0]) =>
      createTask(req, session.data?.user.accessToken!),
    onSuccess(data) {
      toast.success("Task created successfully.", {
        id: "taskCreated",
      });
      addTaskReducer(data);
    },
    onError() {
      toast.error("Failed to create task.", {
        id: "taskCreated",
      });
    },
  });
}

function useUpdateTaskMutation() {
  const { updateTaskReducer } = useStore();
  const session = useSession();

  return useMutation({
    mutationFn: (req: Parameters<typeof updateTask>[0]) =>
      updateTask(req, session.data?.user.accessToken!),
    onSuccess(data) {
      toast.success("Task updated successfully.", {
        id: "taskUpdated",
      });
      updateTaskReducer(data);
    },
    onError() {
      toast.error("Failed to update task.", {
        id: "taskUpdated",
      });
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation };
