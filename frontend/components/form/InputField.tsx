import type { FieldError } from "react-hook-form";

interface Props {
  name: string;
  labelName: string;
  placeholder: string;
  inputProps: any;
  errors: FieldError | undefined;
}

function InputField({
  name,
  labelName,
  placeholder,
  inputProps,
  errors,
}: Props) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {labelName}
      </label>
      <input
        {...inputProps}
        id={name}
        placeholder={placeholder}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none ${
          errors
            ? "focus:border-red-600 focus:ring-red-600"
            : "focus:border-[#6469ff] focus:ring-[#6469ff]"
        }`}
      />

      {errors && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
    </div>
  );
}

export default InputField;
