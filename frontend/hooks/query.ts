import { httpDelete, httpPatch, httpPost } from "@api/client";
import type { TaskDto } from "@api/dtos/TaskDto";
import type { CreateTaskReq } from "@api/req/CreateTaskReq";
import type { UpdateTaskReq } from "@api/req/UpdateTaskReq";
import { useToast } from "@hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: CreateTaskReq) =>
      httpPost("/tasks", req, session.data?.user.access_token!),
    async onMutate() {
      await queryClient.cancelQueries({ queryKey: [queryKeys.tasks] });
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Failed to create task.",
      });
    },
    onSuccess(data) {
      queryClient.setQueryData<TaskDto[]>([queryKeys.tasks], (old) => [
        ...(old ?? []),
        data,
      ]);
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
    async onMutate(newTask: TaskDto) {
      await queryClient.cancelQueries({ queryKey: [queryKeys.tasks] });

      const previousTasks = queryClient.getQueryData<TaskDto[]>([
        queryKeys.tasks,
      ]);

      queryClient.setQueryData<TaskDto[]>([queryKeys.tasks], (old) => [
        ...old!.filter((task) => task.id !== newTask.id),
        newTask,
      ]);

      return { previousTasks };
    },
    onError(_, __, context) {
      queryClient.setQueryData([queryKeys.tasks], context?.previousTasks);

      toast({
        variant: "destructive",
        title: "Failed to update task.",
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
    async onMutate(taskId) {
      await queryClient.cancelQueries({ queryKey: [queryKeys.tasks] });

      const previousTasks = queryClient.getQueryData<TaskDto[]>([
        queryKeys.tasks,
      ]);

      queryClient.setQueryData<TaskDto[]>([queryKeys.tasks], (tasks) =>
        tasks!.filter((task) => task.id !== taskId)
      );

      return { previousTasks };
    },
    onError(_, __, context) {
      queryClient.setQueryData<TaskDto[]>(
        [queryKeys.tasks],
        context?.previousTasks
      );

      toast({
        variant: "destructive",
        title: "Failed to delete task.",
      });
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation };

const queryKeys = {
  tasks: "tasks" as const,
};

export { queryKeys };
