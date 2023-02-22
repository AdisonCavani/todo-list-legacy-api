import { patch, post } from "@api/client";
import type { CreateTaskReq } from "@api/req/CreateTaskReq";
import type { UpdateTaskReq } from "@api/req/UpdateTaskReq";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useStore } from "./store";

function useCreateTaskMutation() {
  const { addTaskReducer } = useStore();
  const session = useSession();

  return useMutation({
    mutationFn: (req: CreateTaskReq) =>
      post("/task/create", req, session.data?.user.accessToken!),
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
    mutationFn: (req: UpdateTaskReq) =>
      patch("/task/update", req, session.data?.user.accessToken!),
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
