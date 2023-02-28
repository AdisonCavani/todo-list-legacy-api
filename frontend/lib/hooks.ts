import { useStore } from "./store";
import { httpDelete, httpPatch, httpPost } from "@api/client";
import type { CreateTaskReq } from "@api/req/CreateTaskReq";
import type { DeleteTaskReq } from "@api/req/DeleteTaskReq";
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
      httpPost("/task/create", req, session.data?.user.accessToken!),
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
      httpPatch("/task/update", req, session.data?.user.accessToken!),
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
    mutationFn: (req: DeleteTaskReq) =>
      httpDelete("/task/delete", req, session.data?.user.accessToken!),
    onSuccess(_, context) {
      toast({
        title: "Task deleted successfully.",
      });
      deleteTaskReducer(context.id);
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
