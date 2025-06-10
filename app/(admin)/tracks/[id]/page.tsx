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
import TextEditor from "@/components/shared/Form/TextEditor";
import {
  useAddTrackMutation,
  useGetSingleTrackQuery,
  useUpdateTrackMutation,
} from "@/redux/features/track/trackApi";
import { useGetSectionsForSelectQuery } from "@/redux/features/dropdown/dropdownApi";

// Enhanced validation schema
const SectionSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(10000, "Title must not exceed 10000 characters")
    .trim("Title cannot contain leading/trailing spaces"),

  body: Yup.string()
    .required("Body content is required")
    .min(10, "Body must be at least 10 characters long")
    .max(100000, "Body must not exceed 100000 characters")
    .trim("Body cannot contain leading/trailing spaces"),

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

  icon3D: Yup.mixed()
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

  const { data, isLoading: getLoading } = useGetSingleTrackQuery(id, {
    skip: !id || id == "add",
  });
  const [addTrack, { isLoading }] = useAddTrackMutation();
  const [updateTrack, { isLoading: updateLoading }] = useUpdateTrackMutation();
  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("icon", values.icon);
    formData.append("icon3D", values.icon3D);
    handleReqWithToaster("track loading ....", async () => {
      if (id == "add") {
        await addTrack(formData).unwrap();
      } else {
        await updateTrack({ id, track: formData }).unwrap();
      }

      router.push("/tracks");
    });
  };

  if (getLoading) return <h1>Loading...</h1>;
  return (
    <section className="w-full flex flex-col gap-6">
      <MainTitle
        title={data?.data?.title ?? "Add Track"}
        description="Details of tracks information and status"
      />
      <section
        className=" border border-gray-200 p-5 rounded-md
       "
      >
        <Formik
          initialValues={{
            title: data?.data?.title ?? "",
            body: data?.data?.body ?? "",
            icon: data?.data?.icon ?? null,
            icon3D: data?.data?.icon3D ?? null,
          }}
          validationSchema={SectionSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <form
              onSubmit={formikProps.handleSubmit}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className=" col-span-2">
                <CustomInput
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="Enter your title"
                />
              </div>

              <ImageUploader
                formikProps={formikProps}
                title="Icon"
                name="icon"
                initialImage={data?.data?.icon}
              />
              <ImageUploader
                formikProps={formikProps}
                title="Icon 3D"
                name="icon3D"
                initialImage={data?.data?.icon3D}
              />
              <div className="col-span-2">
                <TextEditor
                  label="Body"
                  formikProps={formikProps}
                  name="body"
                />
              </div>
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
