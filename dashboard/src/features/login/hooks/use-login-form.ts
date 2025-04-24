"use client";

import { useFormik } from "formik";
import { loginSchema, LoginSchema } from "../schema/login.schema";
import { useLogin } from "./use-login";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../configs/route.config";

const useLoginForm = () => {
  const login = useLogin();
  const router = useRouter();

  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  return useFormik<LoginSchema>({
    initialValues,
    onSubmit: async (values) => {
      await login.loginApi(values).then(async () => {
        router.push(ROUTES.DEFAULT)
      });
    },
    enableReinitialize: true,
    validationSchema: loginSchema,
    validateOnChange: false,
  });
};

export default useLoginForm;
