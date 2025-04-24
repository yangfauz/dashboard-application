import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invald email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;
