"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/shared/Form/CustomInput";
import { Button } from "@/components/ui/button";
import { handleReqWithToaster } from "@/lib/handle-req-with-toaster";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = (values: any) => {
    handleReqWithToaster("Login....", async () => {
      await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      router.push("/");
    });
  };
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <section className="w-[420px] mx-auto flex items-center flex-col gap-3 justify-center border border-gray-200 rounded-md p-8">
        <h1 className="text-36 text-black font-semibold mb-2">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <form
              onSubmit={formikProps.handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <CustomInput
                label="Email"
                placeholder="Enter your email"
                name="email"
                type="email"
              />
              <CustomInput
                label="Password"
                placeholder="********"
                name="password"
                type="password"
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="bg-black hover:bg-black/80"
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
