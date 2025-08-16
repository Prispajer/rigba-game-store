import React from "react";
import { z } from "zod";
import {
  LoginSchema,
  RegisterSchema,
  NewPasswordSchema,
  ResetPasswordSchema,
} from "@/utils/schemas/user";
import requestService from "@/services/RequestService";
import { useSearchParams } from "next/navigation";
import useNotifications from "@/hooks/useNotification";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { RequestResponse } from "@/types/types";

export default function useAuthActions() {
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const { setSuccess, setError, clearNotifications } = useNotifications();
  const { handleClose } = useWindowVisibility();
  const searchParams = useSearchParams();
  const { user } = useCurrentUser();
  const token = searchParams?.get("token");

  const submitLoginForm = async (
    data: z.infer<typeof LoginSchema>,
    callback: (email: string, password: string) => Promise<void>
  ) => {
    clearNotifications();
    startTransition(async () => {
      const { email, password, code } = data;

      if (showTwoFactor && !code) {
        setError({ message: "Invalid code!", origin: "Login" });
      } else {
        try {
          const response: RequestResponse<{
            token: boolean;
            emailVerified: string;
          }> = await requestService.postMethod(
            "users/endpoints/userAuthentication/loginUser",
            { email, password, code }
          );

          if (!response.success) {
            setError({ message: response.message, origin: "Login" });
          } else {
            setSuccess({ message: response.message, origin: "Login" });
            if (response.data?.token) {
              setShowTwoFactor(true);
            }
            if (response.data?.emailVerified) {
              await callback(email, password);
            }
          }
        } catch (error) {
          setError({
            message: "There was a problem while logging in!",
            origin: "Login",
          });
        }
      }
    });
  };

  const submitRegisterForm = async (data: z.infer<typeof RegisterSchema>) => {
    clearNotifications();
    startTransition(async () => {
      const { email, password } = data;
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/registerUser",
          { email, password }
        );
        if (!response.success) {
          setError({ message: response.message, origin: "Register" });
        } else {
          setSuccess({ message: response.message, origin: "Register" });
        }
      } catch (error) {
        setError({
          message: "There was a problem while registering!",
          origin: "Register",
        });
      }
    });
  };

  const submitNewPasswordForm = async (
    data: z.infer<typeof NewPasswordSchema>
  ) => {
    clearNotifications();
    startTransition(async () => {
      const { password } = data;

      if (!token) {
        setError({ message: "Missing token!", origin: "NewPassword" });
        return;
      }

      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/newPassword",
          { password, token }
        );

        if (response.success) {
          setSuccess({ message: response.message, origin: "NewPassword" });
        } else {
          setError({ message: response.message, origin: "NewPassword" });
        }
      } catch (error) {
        setError({
          message: "There was a problem while setting a new password!",
          origin: "NewPassword",
        });
      }
    });
  };

  const submitResetPasswordForm = async (
    data: z.infer<typeof ResetPasswordSchema>
  ) => {
    clearNotifications();
    startTransition(async () => {
      const { email } = data;
      try {
        const response = await requestService.postMethod(
          "users/endpoints/tokenManagement/resetPasswordToken",
          { email }
        );
        if (response.success) {
          setSuccess({ message: response.message, origin: "ResetPassword" });
        } else {
          setError({ message: response.message, origin: "ResetPassword" });
        }
      } catch (error) {
        setError({
          message: "There was a problem while reseting the password!",
          origin: "ResetPassword",
        });
      }
    });
  };

  const submitChangePasswordForm = async (
    code: string,
    data: z.infer<typeof NewPasswordSchema>
  ) => {
    clearNotifications();
    const { password } = data;
    try {
      const response = await requestService.postMethod(
        "users/endpoints/userAuthentication/changePassword",
        { email: user?.email, newPassword: password, code }
      );
      if (response.success) {
        setSuccess({ message: response.message, origin: "ChangePassword" });
        handleClose("twoFactorModal");
      } else {
        setError({ message: response.message, origin: "ChangePassword" });
      }
    } catch (error) {
      setError({
        message: "There was a problem while changing the password!",
        origin: "ChangePassword",
      });
    }
  };

  return {
    submitLoginForm,
    submitRegisterForm,
    submitNewPasswordForm,
    submitResetPasswordForm,
    submitChangePasswordForm,
  };
}
