"use client";

import { useFormik } from "formik";
import useRegister from "./use-register";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/configs/route.config";
import { registerSchema, RegisterSchema } from "../schema/register.schema";

const useRegisterForm = () => {
  const router = useRouter();
  const handleSuccess = () => router.push(ROUTES.DEFAULT);
  const register = useRegister(handleSuccess);

  const initialValues: RegisterSchema = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  return useFormik<RegisterSchema>({
    initialValues,
    onSubmit: async (values) => {
      await register.mutateAsync(values);
    },
    enableReinitialize: true,
    validationSchema: registerSchema,
    validateOnChange: false,
  });
};

export default useRegisterForm;
