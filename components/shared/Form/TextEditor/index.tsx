import { ErrorMessage } from "formik";
import React from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

type Props = {
  formikProps: any;
  name: string;
  label: string;
};

function TextEditor({ formikProps, name, label }: Props) {
  const { values, setFieldValue } = formikProps;

  const handleChange = (e: ContentEditableEvent) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <section className="w-full">
      <span className="text-16 text-black font-semibold mb-2">{label}</span>
      <Editor value={values[name] || ""} onChange={handleChange} />
      <ErrorMessage
        name={name}
        component="span"
        className="text-red-600 text-14 mt-2"
      />
    </section>
  );
}

export default TextEditor;
