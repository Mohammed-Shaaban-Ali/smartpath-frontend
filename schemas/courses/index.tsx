import { isValidYouTubeUrl } from "@/lib/coursesUtils";
import * as Yup from "yup";
// Dynamic validation schema based on mode

export const createValidationSchema = () =>
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
                videoType: Yup.string()
                  .oneOf(["upload", "youtube"])
                  .required("Video type is required"),
                videoFile: Yup.mixed().when("videoType", {
                  is: "upload",
                  then: (schema) =>
                    schema.required("Video file is required for upload type"),
                  otherwise: (schema) => schema.nullable(),
                }),
                videoUrl: Yup.string().when("videoType", {
                  is: "youtube",
                  then: (schema) =>
                    schema
                      .required("YouTube URL is required")
                      .test(
                        "is-youtube-url",
                        "Please enter a valid YouTube URL",
                        isValidYouTubeUrl
                      ),
                  otherwise: (schema) => schema.nullable(),
                }),
              })
            ),
        })
      ),
  });

export const updateValidationSchema = () =>
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
                videoType: Yup.string()
                  .oneOf(["upload", "youtube"])
                  .required("Video type is required"),
                videoFile: Yup.mixed().when("videoType", {
                  is: "upload",
                  then: (schema) => schema.nullable(), // Allow null for updates
                  otherwise: (schema) => schema.nullable(),
                }),
                videoUrl: Yup.string().when("videoType", {
                  is: "youtube",
                  then: (schema) =>
                    schema
                      .required("YouTube URL is required")
                      .test(
                        "is-youtube-url",
                        "Please enter a valid YouTube URL",
                        isValidYouTubeUrl
                      ),
                  otherwise: (schema) => schema.nullable(),
                }),
              })
            ),
        })
      ),
  });
