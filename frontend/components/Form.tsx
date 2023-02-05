"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./form/InputField";
import { createTask } from "@api/client";
import { IconLoader2 } from "@tabler/icons-react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
});

type schemaType = z.infer<typeof schema>;

function Form() {
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

    console.log(res);
  };

  return (
    <form className="mt-16 max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <InputField
          name="title"
          labelName="Title"
          placeholder="A brief description of this code snippet"
          inputProps={{ ...register("title") }}
          errors={errors.title}
        />
      </div>

      <div className="mt-10">
        <p className="mt-2 text-sm text-[#666e75]">
          Once you have created the snippet you wanted, you can share it with
          others in the community
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-3 flex w-full gap-x-2 rounded-md px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto ${
            isSubmitting
              ? "cursor-not-allowed bg-[#6469ff]/80"
              : "cursor-pointer bg-[#6469ff]"
          }`}
        >
          {isSubmitting && <IconLoader2 size={20} className="animate-spin" />}
          Share with the community
        </button>
      </div>
    </form>
  );
}

export default Form;
