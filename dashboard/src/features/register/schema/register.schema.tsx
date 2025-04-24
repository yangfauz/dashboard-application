import * as yup from "yup";

export const registerSchema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  email: yup.string().email("Invald email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(150, "Password cannot exceed 150 characters")
    .matches(/[a-z]/, "Password must contain lowercase letter")
    .matches(/[A-Z]/, "Password must contain uppercase letter")
    .matches(/[0-9]/, "Password must contain number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_]/,
      "Password must contain special character",
    )
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;
