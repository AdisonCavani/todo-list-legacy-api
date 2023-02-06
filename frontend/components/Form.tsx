"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "@api/client";
import { IconLoader2 } from "@tabler/icons-react";
import type { TaskDto } from "@api/dtos/TaskDto";
import type { Dispatch, SetStateAction } from "react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
});

type schemaType = z.infer<typeof schema>;

type Props = {
  callback: (newTask: TaskDto) => void;
};

function Form({ callback }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<schemaType> = async (values) => {
    const res = await createTask({
      title: values.title,
    });

    callback(res);
  };

  return (
    <form className="max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row gap-5">
        <input
          {...register("title")}
          placeholder="Add a task"
          className={`block rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none ${
            errors
              ? "focus:border-red-600 focus:ring-red-600"
              : "focus:border-[#6469ff] focus:ring-[#6469ff]"
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-x-2 rounded-md px-5 py-2.5 text-center text-sm font-medium text-white ${
            isSubmitting
              ? "cursor-not-allowed bg-[#6469ff]/80"
              : "cursor-pointer bg-[#6469ff]"
          }`}
        >
          {isSubmitting && <IconLoader2 size={20} className="animate-spin" />}
          Add
        </button>
      </div>
      {errors.title && (
        <p className="mt-2 text-sm text-red-600">{errors.title?.message}</p>
      )}
    </form>
  );
}

export default Form;
