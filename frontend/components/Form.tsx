"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./form/InputField";
import Loader from "./Loader";
import TextArea from "./form/TextArea";
import { createPost } from "@api/client";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  code: z.string().min(1, "Code is required"),
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
    const res = await createPost({
      code: values.code,
      language: 0,
      theme: 0,
    });

    console.log(res);
  };

  return (
    <form className="mt-16 max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <InputField
          name="name"
          labelName="Your name"
          placeholder="John Doe"
          inputProps={{ ...register("name") }}
          errors={errors.name}
        />

        <InputField
          name="title"
          labelName="Title"
          placeholder="A brief description of this code snippet"
          inputProps={{ ...register("title") }}
          errors={errors.title}
        />

        <TextArea
          name="code"
          labelName="Code"
          placeholder="Your code snippet"
          inputProps={{ ...register("code") }}
          errors={errors.code}
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
          className="mt-3 w-full rounded-md bg-[#6469ff] px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
        >
          {isSubmitting && <Loader />}
          {!isSubmitting && "Share with the community"}
        </button>
      </div>
    </form>
  );
}

export default Form;
