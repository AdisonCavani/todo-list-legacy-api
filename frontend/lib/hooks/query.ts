import { client } from "@api/client";
import type { TaskType } from "@db/schema";
import { useToast } from "@lib/hooks/use-toast";
import type {
  CreateTaskRequest,
  TaskRenderType,
  UpdateTaskRequest,
} from "@lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 } from "uuid";

function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: CreateTaskRequest) =>
      client("/tasks").post({
        body: req,
      }),
    async onMutate(data) {
      await queryClient.cancelQueries({ queryKey: [queryKeys.tasks] });

      const taskId = v4();

      const newTask: TaskRenderType = {
        renderId: taskId,
        id: "",
        userId: "",
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        isCompleted: false,
        isImportant: false,
        dueDate: data.dueDate ?? null,
        ...data,
      };

      const previousTasks =
        queryClient.getQueryData<TaskType[]>([queryKeys.tasks]) ?? [];

      queryClient.setQueryData<TaskType[]>([queryKeys.tasks], (old) => [
        ...(old ?? []),
        newTask,
      ]);

      return { previousTasks, taskId };
    },
    onError(error, _, context) {
      console.error(error);

      queryClient.setQueryData([queryKeys.tasks], context?.previousTasks);
      toast({
        variant: "destructive",
        title: "Failed to create task.",
      });
    },
    onSuccess(data, _, context) {
      queryClient.setQueryData<TaskType[]>([queryKeys.tasks], (old) => {
        if (!old) return [];

        const updatedTasks = old.map((task: TaskRenderType) => {
          if (task.renderId === context?.taskId)
            return {
              renderId: task.renderId,
              ...data,
            };

          return task;
        });

        return updatedTasks;
      });
    },
  });
}

function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: UpdateTaskRequest) =>
      client("/tasks").patch({
        body: req,
      }),
    async onMutate(newTask: TaskType) {
      await queryClient.cancelQueries({ queryKey: [queryKeys.tasks] });

      const previousTasks = queryClient.getQueryData<TaskType[]>([
        queryKeys.tasks,
      ]);

      queryClient.setQueryData<TaskType[]>([queryKeys.tasks], (old) => [
        ...old!.filter((task) => task.id !== newTask.id),
        newTask,
      ]);

      return { previousTasks };
    },
    onError(error, __, context) {
      console.error(error);
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
  const { toast } = useToast();

  return useMutation({
    mutationFn: (req: string) => client("/tasks/{id}", req).delete(),
    async onMutate(taskId) {
      await queryClient.cancelQueries({ queryKey: [queryKeys.tasks] });

      const previousTasks = queryClient.getQueryData<TaskType[]>([
        queryKeys.tasks,
      ]);

      queryClient.setQueryData<TaskType[]>([queryKeys.tasks], (tasks) =>
        tasks!.filter((task) => task.id !== taskId)
      );

      return { previousTasks };
    },
    onError(error, __, context) {
      console.error(error);
      queryClient.setQueryData<TaskType[]>(
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
