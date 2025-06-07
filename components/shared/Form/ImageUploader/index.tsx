/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export const ImageUploader = ({
  formikProps,
  initialImage,
  title,
  name,
}: {
  formikProps: any;
  initialImage?: string | null;
  title: string;
  name: string;
}) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(initialImage || null);

  const handleImageChange = (event: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formikProps.setFieldValue(name, file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        } else {
          // Handle the case where reader.result is not a string
          console.error("Error: reader.result is not a string");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    formikProps.setFieldValue(name, null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-18 flex items-center gap-2 text-black font-medium mb-1">
        {title}
      </label>
      <div className="flex flex-col items-center gap-3">
        {previewImage ? (
          <div className="relative w-32 h-32">
            <Image
              src={previewImage}
              alt="Upload"
              fill
              className="object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
              onClick={removeImage}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-6 w-full flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={() =>
              (
                fileInputRef.current as unknown as { click: () => void }
              )?.click()
            }
          >
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to upload</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {!previewImage && (
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() =>
              (
                fileInputRef.current as unknown as { click: () => void }
              )?.click()
            }
          >
            Choose photo{" "}
          </Button>
        )}
      </div>
      {formikProps.errors.image && formikProps.touched.image && (
        <div className="text-red-500 text-sm mt-1">
          {formikProps.errors.image}
        </div>
      )}
    </div>
  );
};
