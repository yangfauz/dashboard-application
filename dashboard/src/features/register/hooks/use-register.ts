"use client";

import { useMutation } from "@tanstack/react-query";
import httpClient from "@/utils/http-client";
import { API_ROUTE } from "../configs/api-route";
import { RegisterSchema } from "../schema/register.schema";
import { useNotificationBar } from "@/providers/notification.provider";

const registerApi = (body: RegisterSchema) =>
  httpClient.post(API_ROUTE.AUTH.REGISTER.ENDPOINT, {email:body.email, password:body.password, full_name:body.full_name});

const useRegister = (onSuccess?: () => void) => {
  const { openNotificationBar } = useNotificationBar()
  return useMutation({
    mutationFn: registerApi,
    mutationKey: [...API_ROUTE.AUTH.REGISTER.KEY],
    onSuccess: () => {
      if (onSuccess) onSuccess();
      openNotificationBar({
        message: "Please Login",
        title: "Success",
        type: "success"
      })
    },
  });
};

export default useRegister;
