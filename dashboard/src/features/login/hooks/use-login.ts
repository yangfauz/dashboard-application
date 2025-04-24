"use client";

import { useState } from "react";
import { LoginSchema } from "../schema/login.schema";
import { signIn } from "next-auth/react";
import { useNotificationBar } from "@/providers/notification.provider";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { openNotificationBar } = useNotificationBar();

  const loginApi = async (body: LoginSchema) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        ...body,
        redirect: false,
      });

      if (!res?.ok) {
        if (res?.error === "CredentialsSignin") {
          openNotificationBar({
            type: "error",
            message: "Invalid Credentials",
            title: "Login Failed",
          });
          return;
        } else {
          openNotificationBar({
            title: "Sign In Failed !",
            message: res?.error ?? "Please contact your administrator",
            type: "error",
          });
          return;
        }
      }

      if (res?.error) {
        openNotificationBar({
          title: "Sign In Failed !",
          message: res.error,
          type: "error",
        });
        return;
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loginApi,
  };
}
