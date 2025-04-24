"use client";

import React from "react";
import LoginForm from "./components/login-form";
import { ROUTES } from "@/configs/route.config";
import Link from "next/link";
import { Typography } from "antd";

const LoginPage = () => {
  return (
    <div className="w-full h-full">
      <Typography.Paragraph className="!text-gray font-medium text-end mb-[14px]">
        Don&apos;t have an account ?{" "}
        <Link href={ROUTES.AUTH.REGISTER} className="font-medium">Sign up now </Link>
      </Typography.Paragraph>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
