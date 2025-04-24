"use client";

import {  Flex, Typography } from "antd";
import React from "react";
import useLoginForm from "../hooks/use-login-form";
import CoreInput from "@/components/form/input/input";
import CoreButton from "@/components/button/button";

const LoginForm = () => {
  const { values, isSubmitting, handleChange, handleSubmit, errors } =
    useLoginForm();
  return (
    <div className="flex flex-col w-full items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
        <div className="w-full mb-[45px]">
          <Typography.Title level={2}>
            Sign in to <span className="text-primary-500">Dashboard</span>
          </Typography.Title>
        </div>
        <Flex vertical gap={24}>
          <CoreInput
            placeholder="Masukan email anda"
            label="Email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
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
          
          <Flex gap={8}>
            <CoreButton
              loading={isSubmitting}
              htmlType="submit"
              type="primary"
              size="large"
              className="w-[185px]"
            >
              Sign In
            </CoreButton>
          </Flex>
         
        </Flex>
      </form>
    </div>
  );
};

export default LoginForm;
