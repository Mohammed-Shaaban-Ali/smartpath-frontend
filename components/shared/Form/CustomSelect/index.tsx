/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

interface Option {
  [key: string]: any;
}

const CustomSelect = ({
  name,
  title,
  required = false,
  placeholder,
  isMultible = false,
  formikProps,
  options,
  label,
  value,
  initialValue,

  onChangeFunction,
}: {
  name: string;
  title?: string;
  required?: boolean;
  placeholder?: string;
  isMultible?: boolean;
  formikProps: FormikProps<any>;
  options: Option[];
  label: string;
  value: string;
  initialValue?: any;
  onChangeFunction?: any;
}) => {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  useEffect(() => {
    if (initialValue && options) {
      if (isMultible) {
        const selected = options?.filter((option) =>
          initialValue.includes(option[value])
        );
        setSelectedOption(selected);
        formikProps.setFieldValue(name, selected);
      } else {
        const selected = options?.find(
          (option) => option[value] === initialValue
        );
        setSelectedOption(selected);
        formikProps.setFieldValue(name, selected);
      }
    }
  }, []);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
    formikProps.setFieldValue(name, selected);
  };

  return (
    <div>
      {title && (
        <p className={`text-16  text-black/80 font-medium `}>
          {title} {required && <span className="text-red-500  ">*</span>}
        </p>
      )}
      <div className="space-y-2 w-full">
        {" "}
        <Select
          value={selectedOption}
          onChange={(selected) => {
            handleChange(selected);
            onChangeFunction && onChangeFunction(selected);
          }}
          options={options}
          placeholder={placeholder}
          isMulti={isMultible}
          closeMenuOnSelect={!isMultible}
          menuPlacement="bottom"
          className="w-full "
          getOptionLabel={(option: Option) => option[label]}
          getOptionValue={(option: Option) => option[value]}
          required={required}
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: "8px",
              border: "1px solid #D1D5DB",
              backgroundColor: "#F9FAFB",
            }),
            input: (provided) => ({
              ...provided,
              height: "42px",
              borderRadius: "8px",
              border: "1px solid transparent",
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#333",
            }),
            singleValue: (provided) => ({
              ...provided,
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "#333",
            }),
          }}
        />
        <ErrorMessage component={"div"} name={name} className="text-red-500" />
      </div>{" "}
    </div>
  );
};

export default CustomSelect;
