import { cn } from "@/lib/utils";
import { ErrorMessage, Field } from "formik";
import React from "react";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  as?: "input" | "textarea";
  type?: "email" | "password" | "number" | "text";
  onChange?: any;
};

function CustomInput({
  label,
  placeholder,
  name,
  as = "input",
  type = "text",
  onChange,
}: Props) {
  return (
    <section className="w-full">
      <span className="text-16 text-black font-semibold mb-2">{label}</span>
      {onChange ? (
        <Field
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          as={as}
          className={cn(
            "w-full text-14 p-3 border border-gray-300 bg-gray-50 rounded-md placeholder:text-black/50 text-black h-[48px] outline-none",
            as === "textarea" && "h-[220px]"
          )}
        />
      ) : (
        <Field
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          as={as}
          className={cn(
            "w-full text-14 p-3 border border-gray-300 bg-gray-50 rounded-md placeholder:text-black/50 text-black h-[48px] outline-none",
            as === "textarea" && "h-[220px]"
          )}
        />
      )}

      <ErrorMessage
        name={name}
        component="span"
        className="text-red-600 text-14 mt-2"
      />
    </section>
  );
}

export default CustomInput;
