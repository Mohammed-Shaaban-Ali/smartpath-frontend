"use client";
import React, { useEffect } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/shared/Form/CustomInput";
import { Button } from "@/components/ui/button";
import { handleReqWithToaster } from "@/lib/handle-req-with-toaster";
import { useParams, useRouter } from "next/navigation";

import { ImageUploader } from "@/components/shared/Form/ImageUploader";
import MainTitle from "@/components/shared/MainTitle";
import TextEditor from "@/components/shared/Form/TextEditor";
import CustomSelect from "@/components/shared/Form/CustomSelect";

import { useGetTracksForSelectQuery } from "@/redux/features/dropdown/dropdownApi";
import {
  useAddcoursesMutation,
  useGetSinglecoursesQuery,
  useUpdatecoursesMutation,
} from "@/redux/features/courses/coursesApi";

// Dynamic validation schema based on mode
const createValidationSchema = () =>
  Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().required("Image is required"),
    track: Yup.mixed().required("Track is required"),
    sections: Yup.array()
      .min(1, "At least one section is required")
      .of(
        Yup.object({
          title: Yup.string().required("Section title is required"),
          videos: Yup.array()
            .min(1, "At least one video per section is required")
            .of(
              Yup.object({
                title: Yup.string().required("Video title is required"),
                duration: Yup.number()
                  .typeError("Must be a number")
                  .positive("Duration must be positive")
                  .required("Duration is required"),
                videoFile: Yup.mixed().required("Video file is required"),
              })
            ),
        })
      ),
  });

const updateValidationSchema = () =>
  Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed().nullable(),
    track: Yup.mixed().required("Track is required"),
    sections: Yup.array()
      .min(1, "At least one section is required")
      .of(
        Yup.object({
          title: Yup.string().required("Section title is required"),
          videos: Yup.array()
            .min(1, "At least one video per section is required")
            .of(
              Yup.object({
                title: Yup.string().required("Video title is required"),
                duration: Yup.number()
                  .typeError("Must be a number")
                  .positive("Duration must be positive")
                  .required("Duration is required"),
                videoFile: Yup.mixed().nullable(),
              })
            ),
        })
      ),
  });

type Props = {};

function CreateUpdateCoursePage({}: Props) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEditMode = id && id !== "add";

  const { data: track } = useGetTracksForSelectQuery();
  const { data: courseData, isLoading: isLoadingCourse } =
    useGetSinglecoursesQuery(id, {
      skip: !isEditMode,
    });

  const [addcourses, { isLoading: isCreating }] = useAddcoursesMutation();
  const [updatecourses, { isLoading: isUpdating }] = useUpdatecoursesMutation();

  // Get course data for editing
  const course = courseData?.data;

  // Prepare initial values based on mode
  const getInitialValues = () => {
    if (isEditMode && course) {
      return {
        title: course.title || "",
        description: course.description || "",
        image: null, // For updates, we don't pre-fill the file input
        track: course.track || "",
        sections: course.sections?.map((section: any) => ({
          _id: section._id, // Keep section ID for updates
          title: section.title || "",
          videos: section.videos?.map((video: any) => ({
            _id: video._id, // Keep video ID for updates
            title: video.title || "",
            duration: video.duration || "",
            videoFile: null, // For updates, we don't pre-fill the file input
            videoUrl: video.videoUrl || "", // Keep existing video URL
          })) || [{ title: "", duration: "", videoFile: null }],
        })) || [
          { title: "", videos: [{ title: "", duration: "", videoFile: null }] },
        ],
      };
    }

    return {
      title: "",
      description: "",
      image: null,
      track: "",
      sections: [
        {
          title: "",
          videos: [{ title: "", duration: "", videoFile: null }],
        },
      ],
    };
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      // Basic course info
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append(
        "track",
        typeof values.track === "object" ? values.track._id : values.track
      );

      // Course image (only append if a new file is selected)
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      // Process sections with proper field naming for multer
      const sectionsData = values.sections.map(
        (section: any, secIndex: number) => {
          const videosData = section.videos.map(
            (video: any, vidIndex: number) => {
              // Create unique field name for each video file
              const videoFieldName = `section-${secIndex}-video-${vidIndex}`;

              // Only append video file if a new file is selected
              if (video.videoFile instanceof File) {
                formData.append(videoFieldName, video.videoFile);
              }

              return {
                _id: video._id, // Include ID for updates
                title: video.title,
                duration: video.duration,
                videoFieldName:
                  video.videoFile instanceof File ? videoFieldName : undefined,
                videoUrl: video.videoUrl, // Keep existing URL if no new file
              };
            }
          );

          return {
            _id: section._id, // Include ID for updates
            title: section.title,
            videos: videosData,
          };
        }
      );

      // Send sections as JSON string
      formData.append("sections", JSON.stringify(sectionsData));

      const actionText = isEditMode
        ? "Updating course..."
        : "Creating course...";

      await handleReqWithToaster(actionText, async () => {
        if (isEditMode) {
          await updatecourses({ id, courses: formData }).unwrap();
        } else {
          await addcourses(formData).unwrap();
        }
        router.push("/courses");
      });
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} course:`,
        error
      );
    }
  };

  const isLoading = isCreating || isUpdating;

  // Show loading spinner while fetching course data for edit mode
  if (isEditMode && isLoadingCourse) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <MainTitle
        title={isEditMode ? "Update Course" : "Create New Course"}
        description={
          isEditMode
            ? "Update your course details and sections"
            : "Fill in course details and sections"
        }
      />

      <section className="border border-gray-200 p-5 rounded-md">
        <Formik
          key={isEditMode ? course?._id : "create"} // Re-initialize when switching modes
          initialValues={getInitialValues()}
          validationSchema={
            isEditMode ? updateValidationSchema() : createValidationSchema()
          }
          onSubmit={handleSubmit}
          enableReinitialize={true} // Allow reinitializing when course data loads
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit} className="space-y-8">
              <CustomInput
                label="Title"
                name="title"
                type="text"
                placeholder="Enter course title"
              />

              <CustomSelect
                formikProps={formikProps}
                name="track"
                title="Track"
                options={track?.data?.tracks ?? []}
                placeholder="Select track"
                value="_id"
                label="title"
                initialValue={formikProps.values?.track}
              />

              <TextEditor
                label="Description"
                formikProps={formikProps}
                name="description"
              />

              <div className="space-y-2">
                <ImageUploader
                  formikProps={formikProps}
                  title="Course Image"
                  name="image"
                  initialImage={course?.image}
                />
              </div>

              {/* Sections */}
              <FieldArray name="sections">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Course Sections</h3>
                      <Button
                        type="button"
                        onClick={() =>
                          push({
                            title: "",
                            videos: [
                              { title: "", duration: "", videoFile: null },
                            ],
                          })
                        }
                      >
                        + Add Section
                      </Button>
                    </div>

                    {formikProps.values?.sections?.map((section, secIndex) => (
                      <div
                        key={`section-${secIndex}-${section.title}`}
                        className="border border-gray-300 p-4 rounded-lg space-y-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <CustomInput
                              label={`Section ${secIndex + 1} Title`}
                              name={`sections.${secIndex}.title`}
                              type="text"
                              placeholder="Enter section title"
                            />
                          </div>
                          {formikProps.values.sections.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => remove(secIndex)}
                            >
                              Remove Section
                            </Button>
                          )}
                        </div>

                        {/* Videos */}
                        <FieldArray name={`sections.${secIndex}.videos`}>
                          {({ push: pushVideo, remove: removeVideo }) => (
                            <div className="space-y-3 border-t pt-4">
                              <div className="flex justify-between items-center">
                                <h4 className="text-md font-medium">Videos</h4>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    pushVideo({
                                      title: "",
                                      duration: "",
                                      videoFile: null,
                                    })
                                  }
                                >
                                  + Add Video
                                </Button>
                              </div>

                              {section.videos?.map(
                                (video: any, vidIndex: number) => (
                                  <div
                                    key={video._id || vidIndex}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 border border-gray-200 rounded bg-white"
                                  >
                                    <CustomInput
                                      label="Video Title"
                                      name={`sections.${secIndex}.videos.${vidIndex}.title`}
                                      type="text"
                                      placeholder="Enter video title"
                                    />

                                    <CustomInput
                                      label="Duration (minutes)"
                                      name={`sections.${secIndex}.videos.${vidIndex}.duration`}
                                      type="number"
                                      placeholder="Enter duration"
                                    />

                                    <div className="space-y-2">
                                      <label className="text-sm font-medium block">
                                        Upload Video File
                                      </label>
                                      <div className="flex flex-col gap-2">
                                        <input
                                          type="file"
                                          accept="video/*"
                                          className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                          onChange={(e) => {
                                            const file =
                                              e.currentTarget.files?.[0] ||
                                              null;
                                            formikProps.setFieldValue(
                                              `sections.${secIndex}.videos.${vidIndex}.videoFile`,
                                              file
                                            );
                                          }}
                                        />

                                        {/* Show current video info for edit mode */}
                                        {isEditMode &&
                                          video.videoUrl &&
                                          !video.videoFile && (
                                            <div className="text-xs text-green-600 flex items-center gap-1">
                                              <span>
                                                ✓ Current video uploaded
                                              </span>
                                              <span className="text-gray-500">
                                                (Upload new file to replace)
                                              </span>
                                            </div>
                                          )}

                                        {/* Show new file selected */}
                                        {video.videoFile && (
                                          <p className="text-green-600 text-xs">
                                            ✓ {video.videoFile.name}
                                          </p>
                                        )}

                                        {/* Show validation errors */}
                                        {Array.isArray(
                                          formikProps.errors.sections
                                        ) &&
                                          Array.isArray(
                                            formikProps.touched.sections
                                          ) &&
                                          typeof formikProps.errors.sections?.[
                                            secIndex
                                          ] === "object" &&
                                          typeof (
                                            formikProps.errors.sections[
                                              secIndex
                                            ] as any
                                          )?.videos?.[vidIndex] === "object" &&
                                          (
                                            formikProps.errors.sections[
                                              secIndex
                                            ] as any
                                          )?.videos?.[vidIndex]?.videoFile &&
                                          (
                                            formikProps.touched.sections[
                                              secIndex
                                            ] as any
                                          )?.videos?.[vidIndex]?.videoFile && (
                                            <p className="text-red-500 text-xs">
                                              {
                                                (
                                                  formikProps.errors.sections[
                                                    secIndex
                                                  ] as any
                                                )?.videos?.[vidIndex]?.videoFile
                                              }
                                            </p>
                                          )}
                                      </div>

                                      {section.videos.length > 1 && (
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          size="sm"
                                          onClick={() => removeVideo(vidIndex)}
                                        >
                                          Remove Video
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              <div className="flex justify-end pt-6 border-t">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="px-8 py-2"
                  size="lg"
                >
                  {isLoading
                    ? isEditMode
                      ? "Updating Course..."
                      : "Creating Course..."
                    : isEditMode
                    ? "Update Course"
                    : "Create Course"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </section>
  );
}

export default CreateUpdateCoursePage;
