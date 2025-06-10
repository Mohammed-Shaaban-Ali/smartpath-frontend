"use client";
import React, { useEffect, useState } from "react";
import { Formik, FieldArray } from "formik";
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
import {
  createValidationSchema,
  updateValidationSchema,
} from "@/schemas/courses";
import {
  getVideoDuration,
  getYouTubeDuration,
  isValidYouTubeUrl,
} from "@/lib/coursesUtils";

type Props = {};

function CreateUpdateCoursePage({}: Props) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEditMode = id && id !== "add";

  // State for duration detection loading
  const [durationDetectionStates, setDurationDetectionStates] = useState<
    Record<string, boolean>
  >({});

  const { data: track } = useGetTracksForSelectQuery();
  const { data: courseData, isLoading: isLoadingCourse } =
    useGetSinglecoursesQuery(id, {
      skip: !isEditMode,
    });

  const [addcourses, { isLoading: isCreating }] = useAddcoursesMutation();
  const [updatecourses, { isLoading: isUpdating }] = useUpdatecoursesMutation();

  // Get course data for editing
  const course = courseData?.data;

  // Helper function to manage duration detection loading state
  const setDurationDetectionLoading = (
    secIndex: number,
    vidIndex: number,
    loading: boolean
  ) => {
    const key = `${secIndex}-${vidIndex}`;
    setDurationDetectionStates((prev) => ({
      ...prev,
      [key]: loading,
    }));
  };

  const getDurationDetectionLoading = (secIndex: number, vidIndex: number) => {
    const key = `${secIndex}-${vidIndex}`;
    return durationDetectionStates[key] || false;
  };

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
            videoType: video.videoType || "upload",
            videoFile: null, // For updates, we don't pre-fill the file input
            videoUrl: video.videoUrl || "", // Keep existing video URL
            youtubeId: video.youtubeId || "", // Keep YouTube ID
          })) || [
            {
              title: "",
              duration: "",
              videoType: "upload",
              videoFile: null,
              videoUrl: "",
            },
          ],
        })) || [
          {
            title: "",
            videos: [
              {
                title: "",
                duration: "",
                videoType: "upload",
                videoFile: null,
                videoUrl: "",
              },
            ],
          },
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
          videos: [
            {
              title: "",
              duration: "",
              videoType: "upload",
              videoFile: null,
              videoUrl: "",
            },
          ],
        },
      ],
    };
  };

  // Handle video file change with auto-duration detection
  const handleVideoFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    secIndex: number,
    vidIndex: number,
    formikProps: any
  ) => {
    const file = e.currentTarget.files?.[0] || null;

    if (file) {
      setDurationDetectionLoading(secIndex, vidIndex, true);

      try {
        // Set the file first
        formikProps.setFieldValue(
          `sections.${secIndex}.videos.${vidIndex}.videoFile`,
          file
        );

        // Auto-detect duration
        const duration = await getVideoDuration(file);
        formikProps.setFieldValue(
          `sections.${secIndex}.videos.${vidIndex}.duration`,
          duration
        );

        console.log(`Auto-detected duration: ${duration} minutes`);
      } catch (error) {
        console.error("Could not detect video duration:", error);
        // Keep manual input as fallback
      } finally {
        setDurationDetectionLoading(secIndex, vidIndex, false);
      }
    } else {
      // Clear the file
      formikProps.setFieldValue(
        `sections.${secIndex}.videos.${vidIndex}.videoFile`,
        null
      );
    }
  };

  // Handle YouTube URL change with auto-duration detection
  const handleYouTubeUrlChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    secIndex: number,
    vidIndex: number,
    formikProps: any
  ) => {
    const url = e.target.value;

    formikProps.setFieldValue(
      `sections.${secIndex}.videos.${vidIndex}.videoUrl`,
      url
    );

    if (url && isValidYouTubeUrl(url)) {
      setDurationDetectionLoading(secIndex, vidIndex, true);

      try {
        const duration = await getYouTubeDuration(url);
        if (duration) {
          formikProps.setFieldValue(
            `sections.${secIndex}.videos.${vidIndex}.duration`,
            duration
          );
          console.log(`Auto-detected YouTube duration: ${duration} minutes`);
        }
      } catch (error) {
        console.error("Could not fetch YouTube duration:", error);
      } finally {
        setDurationDetectionLoading(secIndex, vidIndex, false);
      }
    }
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
              const baseVideoData = {
                _id: video._id, // Include ID for updates
                title: video.title,
                duration: video.duration,
                videoType: video.videoType,
              };

              if (video.videoType === "youtube") {
                // For YouTube videos, just include the URL
                return {
                  ...baseVideoData,
                  videoUrl: video.videoUrl,
                };
              } else {
                // For uploaded videos
                const videoFieldName = `section-${secIndex}-video-${vidIndex}`;

                // Only append video file if a new file is selected
                if (video.videoFile instanceof File) {
                  formData.append(videoFieldName, video.videoFile);
                }

                return {
                  ...baseVideoData,
                  videoFieldName:
                    video.videoFile instanceof File
                      ? videoFieldName
                      : undefined,
                  videoUrl: video.videoUrl, // Keep existing URL if no new file
                };
              }
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
                              {
                                title: "",
                                duration: "",
                                videoType: "youtube",
                                videoFile: null,
                                videoUrl: "",
                              },
                            ],
                          })
                        }
                      >
                        + Add Section
                      </Button>
                    </div>

                    {formikProps.values?.sections?.map((section, secIndex) => (
                      <div
                        key={`section-${secIndex}-${section.title}-${section.videos?.length}`}
                        className="border border-gray-300 p-4 rounded-lg space-y-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <CustomInput
                              label={`Section ${secIndex + 1} Title`}
                              name={`sections.${secIndex}.title`}
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
                                      videoType: "youtube",
                                      videoFile: null,
                                      videoUrl: "",
                                    })
                                  }
                                >
                                  + Add Video
                                </Button>
                              </div>

                              {section.videos?.map(
                                (video: any, vidIndex: number) => {
                                  const isDetectingDuration =
                                    getDurationDetectionLoading(
                                      secIndex,
                                      vidIndex
                                    );

                                  return (
                                    <div
                                      key={video._id || vidIndex}
                                      className="p-4 border border-gray-200 rounded bg-white space-y-4"
                                    >
                                      {/* Video Title and Duration Row */}
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                          <CustomInput
                                            label="Video Title"
                                            name={`sections.${secIndex}.videos.${vidIndex}.title`}
                                            type="text"
                                            placeholder="Enter video title"
                                          />
                                        </div>

                                        <div className="relative">
                                          <CustomInput
                                            label="Duration (minutes)"
                                            name={`sections.${secIndex}.videos.${vidIndex}.duration`}
                                            type="number"
                                            placeholder={
                                              isDetectingDuration
                                                ? "Detecting..."
                                                : "Enter duration"
                                            }
                                          />
                                          {isDetectingDuration && (
                                            <div className="absolute right-3 top-9">
                                              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Video Type Selection */}
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium block">
                                          Video Type
                                        </label>
                                        <div className="flex gap-4">
                                          <label className="flex items-center gap-2">
                                            <input
                                              type="radio"
                                              name={`sections.${secIndex}.videos.${vidIndex}.videoType`}
                                              value="upload"
                                              checked={
                                                video.videoType === "upload"
                                              }
                                              onChange={(e) => {
                                                formikProps.setFieldValue(
                                                  `sections.${secIndex}.videos.${vidIndex}.videoType`,
                                                  e.target.value
                                                );
                                                // Clear the other field when switching
                                                formikProps.setFieldValue(
                                                  `sections.${secIndex}.videos.${vidIndex}.videoUrl`,
                                                  ""
                                                );
                                              }}
                                            />
                                            <span>Upload Video</span>
                                          </label>
                                          <label className="flex items-center gap-2">
                                            <input
                                              type="radio"
                                              name={`sections.${secIndex}.videos.${vidIndex}.videoType`}
                                              value="youtube"
                                              checked={
                                                video.videoType === "youtube"
                                              }
                                              onChange={(e) => {
                                                formikProps.setFieldValue(
                                                  `sections.${secIndex}.videos.${vidIndex}.videoType`,
                                                  e.target.value
                                                );
                                                // Clear the other field when switching
                                                formikProps.setFieldValue(
                                                  `sections.${secIndex}.videos.${vidIndex}.videoFile`,
                                                  null
                                                );
                                              }}
                                            />
                                            <span>YouTube Video</span>
                                          </label>
                                        </div>
                                      </div>

                                      {/* Conditional Video Input */}
                                      {video.videoType === "upload" ? (
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium block">
                                            Upload Video File
                                          </label>
                                          <div className="flex flex-col gap-2">
                                            <input
                                              type="file"
                                              accept="video/*"
                                              className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                              onChange={(e) =>
                                                handleVideoFileChange(
                                                  e,
                                                  secIndex,
                                                  vidIndex,
                                                  formikProps
                                                )
                                              }
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
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="space-y-2">
                                          <CustomInput
                                            label="YouTube Video URL"
                                            name={`sections.${secIndex}.videos.${vidIndex}.videoUrl`}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            onChange={(e: any) =>
                                              handleYouTubeUrlChange(
                                                e,
                                                secIndex,
                                                vidIndex,
                                                formikProps
                                              )
                                            }
                                          />
                                          {video.videoUrl &&
                                            isValidYouTubeUrl(
                                              video.videoUrl
                                            ) && (
                                              <div className="text-xs text-green-600">
                                                ✓ Valid YouTube URL
                                              </div>
                                            )}
                                        </div>
                                      )}

                                      {/* Remove Video Button */}
                                      {section.videos.length > 1 && (
                                        <div className="flex justify-end">
                                          <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                              removeVideo(vidIndex)
                                            }
                                          >
                                            Remove Video
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
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
