import { useStore } from "../lib/store";
import { httpDelete, httpPatch, httpPost } from "@api/client";
import type { TaskDto } from "@api/dtos/TaskDto";
import type { CreateTaskReq } from "@api/req/CreateTaskReq";
import type { UpdateTaskReq } from "@api/req/UpdateTaskReq";
import { useToast } from "@hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

function useCreateTaskMutation() {
  const { addTaskReducer, deleteTaskReducer, replaceTaskReducer } = useStore();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: CreateTaskReq) =>
      httpPost("/tasks", req, session.data?.user.accessToken!),
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

      addTaskReducer(newTask);

      return taskId;
    },
    onError(_, __, taskId) {
      deleteTaskReducer(taskId!);

      toast({
        variant: "destructive",
        title: "Failed to create task.",
      });
    },
    onSuccess(data, _, context) {
      replaceTaskReducer({
        taskId: context!,
        payloadTask: data,
      });

      toast({
        title: "Task created successfully.",
      });
    },
  });
}

function useUpdateTaskMutation() {
  const { updateTaskReducer, tasks } = useStore();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: UpdateTaskReq) =>
      httpPatch("/tasks", req, session.data?.user.accessToken!),
    onMutate(data) {
      const prevTask = tasks.find((x) => x.id === data.id)!;
      const newTask: TaskDto = {
        ...prevTask,
        ...data,
      };

      updateTaskReducer(newTask);

      return prevTask;
    },
    onError(_, __, context) {
      const prevTask = tasks.find((x) => x.id === context?.id)!;
      const newTask: TaskDto = {
        ...prevTask,
        ...context,
      };

      updateTaskReducer(newTask);

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
  const { deleteTaskReducer, addTaskReducer, tasks } = useStore();
  const session = useSession();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: string) =>
      httpDelete("/tasks/{id}", req, session.data?.user.accessToken!),
    onMutate(taskId) {
      const task = tasks.find((x) => x.id === taskId);
      deleteTaskReducer(taskId);

      return task;
    },
    onError(_, __, context) {
      addTaskReducer(context!);

      toast({
        variant: "destructive",
        title: "Failed to delete task.",
      });
    },
    onSuccess(_, context) {
      deleteTaskReducer(context);

      toast({
        title: "Task deleted successfully.",
      });
    },
  });
}

export { useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation };
