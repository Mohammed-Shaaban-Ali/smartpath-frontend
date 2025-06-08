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

import { useGetFramworksForSelectQuery } from "@/redux/features/dropdown/dropdownApi";
import CustomSelect from "@/components/shared/Form/CustomSelect";

import {
  useAddroadmapMutation,
  useGetSingleroadmapQuery,
  useUpdateroadmapMutation,
} from "@/redux/features/roadmap/roadmapApi";

// Enhanced validation schema
const SectionSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(10000, "Title must not exceed 10000 characters")
    .trim("Title cannot contain leading/trailing spaces"),

  link: Yup.string().required("Link is required"),

  icon: Yup.mixed()
    .required("Icon is required")
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

  const { data: framworks } = useGetFramworksForSelectQuery();
  const { data, isLoading: getLoading } = useGetSingleroadmapQuery(id, {
    skip: !id || id == "add",
  });
  const [addroadmap, { isLoading }] = useAddroadmapMutation();
  const [updateroadmap, { isLoading: updateLoading }] =
    useUpdateroadmapMutation();
  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("icon", values.icon);
    formData.append("link", values.link);
    formData.append("framework", values.framework?._id);
    handleReqWithToaster("roadmap loading ....", async () => {
      if (id == "add") {
        await addroadmap(formData).unwrap();
      } else {
        await updateroadmap({ id, roadmap: formData }).unwrap();
      }

      router.push("/roadmaps");
    });
  };

  if (getLoading) return <h1>Loading...</h1>;
  return (
    <section className="w-full flex flex-col gap-6">
      <MainTitle
        title={data?.data?.title ?? "Add roadmap"}
        description="Details of roadmaps information and status"
      />
      <section
        className=" border border-gray-200 p-5 rounded-md
       "
      >
        <Formik
          initialValues={{
            title: data?.data?.title ?? "",
            icon: data?.data?.icon ?? null,
            framework: data?.data?.framework?._id ?? null,
            link: data?.data?.link ?? "",
          }}
          validationSchema={SectionSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <form
              onSubmit={formikProps.handleSubmit}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <CustomInput
                label="Title"
                name="title"
                type="text"
                placeholder="Enter your title"
              />
              <CustomSelect
                formikProps={formikProps}
                name="framework"
                title="Framework"
                options={framworks?.data ?? []}
                placeholder="Select a framework"
                value="_id"
                label="title"
                initialValue={formikProps.values.framework}
              />
              <CustomInput
                label="Link"
                name="link"
                type="text"
                placeholder="Enter your link"
              />
              <ImageUploader
                formikProps={formikProps}
                title="Icon"
                name="icon"
                initialImage={data?.data?.icon}
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
