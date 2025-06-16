"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/shared/Form/CustomInput";
import { Button } from "@/components/ui/button";
import { handleReqWithToaster } from "@/lib/handle-req-with-toaster";
import { useParams, useRouter } from "next/navigation";

import { ImageUploader } from "@/components/shared/Form/ImageUploader";
import MainTitle from "@/components/shared/MainTitle";

import {
  useCreateGroupMutation,
  useGetGroupByIdQuery,
  useUpdateGroupMutation,
} from "@/redux/features/community/communityApi";

// Enhanced validation schema
const ComuntySchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(10000, "Name must not exceed 10000 characters")
    .trim("Name cannot contain leading/trailing spaces"),

  image: Yup.mixed()
    .required("image is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024; // 5MB
      }
      return true;
    })
    .test(
      "fileType",
      "Only image files are allowed (JPEG, PNG, GIF, WebP)",
      (value) => {
        if (!value) return false;
        if (value instanceof File) {
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ];
          return allowedTypes.includes(value.type);
        }
        return true;
      }
    ),
});

type Props = {};

function Page({}: Props) {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data, isLoading: getLoading } = useGetGroupByIdQuery(id, {
    skip: !id || id == "add",
  });
  const [addCroup, { isLoading }] = useCreateGroupMutation();
  const [updateCroup, { isLoading: updateLoading }] = useUpdateGroupMutation();
  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (typeof values.icon !== "string") formData.append("image", values.image);
    handleReqWithToaster("group loading ....", async () => {
      if (id == "add") {
        await addCroup(formData).unwrap();
      } else {
        await updateCroup({ id, group: formData }).unwrap();
      }

      router.push("/community");
    });
  };

  if (getLoading) return <h1>Loading...</h1>;
  return (
    <section className="w-full flex flex-col gap-6">
      <MainTitle
        title={data?.data?.group?.name ?? "Add New Community"}
        description="Details of Community information and status"
      />
      <section
        className=" border border-gray-200 p-5 rounded-md
       "
      >
        <Formik
          initialValues={{
            name: data?.data?.group?.name ?? "",
            icon: data?.data?.group?.image ?? null,
          }}
          validationSchema={ComuntySchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <form
              onSubmit={formikProps.handleSubmit}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <CustomInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your Name"
              />

              <ImageUploader
                formikProps={formikProps}
                title="image"
                name="image"
                initialImage={data?.data?.group?.image}
              />

              <Button
                disabled={isLoading || updateLoading}
                className=" ml-auto w-[200px] col-span-2 mt-5"
                type="submit"
                size={"lg"}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </section>
    </section>
  );
}

export default Page;
