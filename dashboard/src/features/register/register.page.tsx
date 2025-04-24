"use client";

import React from "react";
import Link from "next/link";
import { ROUTES } from "@/configs/route.config";
import RegisterForm from "./components/register-form";
import { Typography } from "antd";

const RegisterPage = () => {
  return (
    <div className="w-full h-full">
      <Typography.Paragraph className="!text-gray font-medium text-end mb-[14px]">
        Already have an account ?{" "}
        <Link href={ROUTES.AUTH.LOGIN}>Sign in now</Link>
      </Typography.Paragraph>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
