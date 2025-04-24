"use client";

import { Flex, Typography } from "antd";
import React from "react";
import CoreInput from "@/components/form/input/input";
import useRegisterForm from "../hooks/use-register-form";
import CoreButton from "@/components/button/button";

const RegisterForm = () => {
  const { values, isSubmitting, handleChange, handleSubmit, errors } =
    useRegisterForm();
  return (
    <div className="flex flex-col w-full items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
        <div className="w-full mb-[45px]">
          <Typography.Title level={2}>
            Sign up to <span className="text-primary-500">Dashboard</span>
          </Typography.Title>
        </div>
        <Flex vertical gap={24}>
          <CoreInput
            placeholder="Full Name"
            name="full_name"
            label="Full Name"
            value={values.full_name}
            onChange={handleChange}
            status={errors.full_name && "error"}
            error={errors.full_name}
            required
          />
          <CoreInput
            placeholder="name@example.com"
            label="Email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            status={errors.email && "error"}
            error={errors.email}
            required
          />
          <CoreInput.Password
            placeholder="Password"
            label="Password"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <CoreInput.Password
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirm_password"
            autoComplete="current-password"
            value={values.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
            required
          />
          <Flex gap={8}>
            <CoreButton
              size="large"
              loading={isSubmitting}
              htmlType="submit"
              type="primary"
              className="w-[185px]"
            >
              Sign Up
            </CoreButton>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default RegisterForm;
