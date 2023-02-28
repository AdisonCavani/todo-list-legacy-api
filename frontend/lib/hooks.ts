import { useStore } from "./store";
import { httpDelete, httpPatch, httpPost } from "@api/client";
import type { CreateTaskReq } from "@api/req/CreateTaskReq";
import type { DeleteTaskReq } from "@api/req/DeleteTaskReq";
import type { UpdateTaskReq } from "@api/req/UpdateTaskReq";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

function useCreateTaskMutation() {
  const { addTaskReducer } = useStore();
  const session = useSession();

  return useMutation({
    mutationFn: (req: CreateTaskReq) =>
      httpPost("/task/create", req, session.data?.user.accessToken!),
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
      httpPatch("/task/update", req, session.data?.user.accessToken!),
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

function useDeleteTaskMutation() {
  const { deleteTaskReducer } = useStore();
  const session = useSession();

  return useMutation({
    mutationFn: (req: DeleteTaskReq) =>
      httpDelete("/task/delete", req, session.data?.user.accessToken!),
    onSuccess(_, context) {
      toast.success("Task deleted successfully.", {
        id: "taskDeleted",
      });
      deleteTaskReducer(context.id);
    },
    onError() {
      toast.error("Failed to delete task.", {
        id: "taskDeleted",
      });
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation };
