import { httpDelete, httpPatch, httpPost } from "@api/client";
import type { TaskDto } from "@api/dtos/TaskDto";
import type { CreateTaskReq } from "@api/req/CreateTaskReq";
import type { UpdateTaskReq } from "@api/req/UpdateTaskReq";
import { useToast } from "@hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: CreateTaskReq) =>
      httpPost("/tasks", req, session.data?.user.access_token!),
    onMutate(data) {
      const taskId = v4();

      const newTask: TaskDto = {
        id: taskId,
        userId: "",
        createdAt: new Date().toISOString(),
        isCompleted: false,
        isImportant: false,
        ...data,
      };

      const previousTasks =
        queryClient.getQueryData<TaskDto[]>(["tasks"]) ?? [];

      queryClient.setQueryData<TaskDto[]>(["tasks"], (old) => [
        ...(old ?? []),
        newTask,
      ]);

      return { previousTasks, taskId };
    },
    onError(_, __, context) {
      queryClient.setQueryData(["tasks"], context?.previousTasks);

      toast({
        variant: "destructive",
        title: "Failed to create task.",
      });
    },
    onSuccess(data, _, context) {
      queryClient.setQueryData<TaskDto[]>(["tasks"], (old) => [
        ...(old?.filter((task) => task.id !== context?.taskId) ?? []),
        data,
      ]);

      toast({
        title: "Task created successfully.",
      });
    },
  });
}

function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: UpdateTaskReq) =>
      httpPatch("/tasks", req, session.data?.user.access_token!),
    onMutate(newTask: TaskDto) {
      const previousTasks = queryClient.getQueryData<TaskDto[]>(["tasks"]);

      queryClient.setQueryData<TaskDto[]>(["tasks"], (old) => [
        ...old!.filter((task) => task.id !== newTask.id),
        newTask,
      ]);

      return { previousTasks };
    },
    onError(_, __, context) {
      queryClient.setQueryData(["tasks"], context?.previousTasks);

      toast({
        variant: "destructive",
        title: "Failed to update task.",
      });
    },
    onSuccess() {
      toast({
        title: "Task updated successfully.",
      });
    },
  });
}

function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: string) =>
      httpDelete("/tasks/{id}", req, session.data?.user.access_token!),
    onMutate(taskId) {
      const previousTasks = queryClient.getQueryData<TaskDto[]>(["tasks"]);

      queryClient.setQueryData<TaskDto[]>(["tasks"], (tasks) =>
        tasks!.filter((task) => task.id !== taskId)
      );

      return { previousTasks };
    },
    onError(_, __, context) {
      queryClient.setQueryData<TaskDto[]>(["tasks"], context?.previousTasks);

      toast({
        variant: "destructive",
        title: "Failed to delete task.",
      });
    },
    onSuccess() {
      toast({
        title: "Task deleted successfully.",
      });
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation };
