import React from "react";
import { z } from "zod";
import {
  LoginSchema,
  RegisterSchema,
  NewPasswordSchema,
  ResetPasswordSchema,
} from "@/utils/schemas/user";
import { useSearchParams } from "next/navigation";
import submitRequest from "@/lib/submitRequest";
import useNotifications from "@/hooks/useNotification";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import { HttpMethod } from "@/types/types";

export default function useAuthActions() {
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const { handleSuccess, handleError, handleReset } = useNotifications();
  const searchParams = useSearchParams();
  const { user } = useCurrentUser();
  const token = searchParams?.get("token");
  const providerError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const handleLoginSubmit = async (
    payload: z.infer<typeof LoginSchema>,
    callback: (email: string, password: string) => Promise<void>
  ) => {
    startTransition(async () => {
      const { email, password, code } = payload;

      if (showTwoFactor && !code) {
        handleError("Invalid code!", NotificationOrigin.Login);
        return;
      }

      const response = await submitRequest(
        HttpMethod.POST,
        "users/endpoints/userAuthentication/loginUser",
        { email, password, code },
        NotificationOrigin.Login,
        { handleSuccess, handleError, handleReset }
      );

      if (!response) return;

      if (response.data?.token) {
        setShowTwoFactor(true);
      }

      if (response.data?.emailVerified) {
        await callback(email, password);
      }
    });
  };

  const handleRegisterSubmit = async (
    payload: z.infer<typeof RegisterSchema>
  ) => {
    startTransition(async () => {
      const { email, password } = payload;

      const response = await submitRequest(
        HttpMethod.POST,
        "users/endpoints/userAuthentication/registerUser",
        { email, password },
        NotificationOrigin.Register,
        { handleSuccess, handleError, handleReset }
      );

      if (!response) return;
    });
  };

  const handleNewPasswordSubmit = async (
    payload: z.infer<typeof NewPasswordSchema>
  ) => {
    startTransition(async () => {
      const { password } = payload;

      if (!token) {
        handleError("Missing token!", NotificationOrigin.NewPassword);
        return;
      }

      const response = await submitRequest(
        HttpMethod.POST,
        "users/endpoints/userAuthentication/newPassword",
        { password, token },
        NotificationOrigin.NewPassword,
        { handleSuccess, handleError, handleReset }
      );

      if (!response) return;
    });
  };

  const handleResetPasswordSubmit = async (
    payload: z.infer<typeof ResetPasswordSchema>
  ) => {
    startTransition(async () => {
      const { email } = payload;

      const response = await submitRequest(
        HttpMethod.POST,
        "users/endpoints/tokenManagement/resetPasswordToken",
        { email },
        NotificationOrigin.ResetPassword,
        { handleSuccess, handleError, handleReset }
      );

      if (!response) return;
    });
  };

  const handleChangePasswordSubmit = async (
    code: string,
    payload: z.infer<typeof NewPasswordSchema>
  ) => {
    const { password } = payload;

    const response = await submitRequest(
      HttpMethod.POST,
      "users/endpoints/userAuthentication/changePassword",
      { email: user?.email, newPassword: password, code },
      NotificationOrigin.ChangePassword,
      { handleSuccess, handleError, handleReset }
    );

    if (!response) return;
  };

  return {
    showTwoFactor,
    isPending,
    providerError,
    setShowTwoFactor,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleNewPasswordSubmit,
    handleResetPasswordSubmit,
    handleChangePasswordSubmit,
  };
}
