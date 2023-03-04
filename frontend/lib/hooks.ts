import { useStore } from "./store";
import { httpDelete, httpPatch, httpPost } from "@api/client";
import type { CreateTaskReq } from "@api/req/CreateTaskReq";
import type { UpdateTaskReq } from "@api/req/UpdateTaskReq";
import { useToast } from "@hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function useCreateTaskMutation() {
  const { addTaskReducer } = useStore();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: CreateTaskReq) =>
      httpPost("/tasks", req, session.data?.user.accessToken!),
    onSuccess(data) {
      toast({
        title: "Task created successfully.",
      });
      addTaskReducer(data);
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Failed to create task.",
      });
    },
  });
}

function useUpdateTaskMutation() {
  const { updateTaskReducer } = useStore();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: UpdateTaskReq) =>
      httpPatch("/tasks", req, session.data?.user.accessToken!),
    onSuccess(data) {
      toast({
        title: "Task updated successfully.",
      });
      updateTaskReducer(data);
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Failed to update task.",
      });
    },
  });
}

function useDeleteTaskMutation() {
  const { deleteTaskReducer } = useStore();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: Parameters<typeof httpDelete>["1"]) =>
      httpDelete("/tasks/{id}", req, session.data?.user.accessToken!),
    onSuccess(_, context) {
      toast({
        title: "Task deleted successfully.",
      });
      deleteTaskReducer(context);
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Failed to delete task.",
      });
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation };
