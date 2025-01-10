import React from "react";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import useCurrentUser from "./useCurrentUser";
import useWindowVisibility from "./useWindowVisibility";
import requestService from "@/services/RequestService";
import {
  LoginSchema,
  RegisterSchema,
  NewPasswordSchema,
  ResetPasswordSchema,
  PersonalDataSchema,
  UpdateNameSchema,
} from "@/utils/schemas/user";
import { RequestResponse } from "@/utils/helpers/types";

export default function useUserServices() {
  const [success, setSuccess] = React.useState<{
    message?: string;
    origin?: string;
  } | null>();
  const [error, setError] = React.useState<{
    message?: string;
    origin?: string;
  } | null>();
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const { handleClose } = useWindowVisibility();
  const { user, update } = useCurrentUser();
  const token = searchParams?.get("token");
  const providerError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const clearNotifications = () => {
    setError(undefined);
    setSuccess(undefined);
  };

  React.useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        clearNotifications();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  function useUserSecurity() {
    const submitToggleTwoFactor = async (code: string) => {
      clearNotifications();
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/toggleTwoFactor",
          { email: user?.email, code }
        );
        if (response.success) {
          setSuccess({ message: response.message, origin: "ToggleTwoFactor" });
          handleClose("twoFactorModal");
          update(response.data);
        } else {
          setError({ message: response.message, origin: "ToggleTwoFactor" });
        }
      } catch (error) {
        setError({
          message:
            "There was a problem while toggling two-factor authentication!",
          origin: "ToggleTwoFactor",
        });
      }
    };

    const submitEmailVerification = React.useCallback(async () => {
      clearNotifications();
      if (!token) {
        setError({ message: "Missing token!", origin: "EmailVerification" });
        return;
      }
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/emailVerification",
          { token }
        );
        if (!response.success) {
          setError({ message: response.message, origin: "EmailVerification" });
        } else {
          setSuccess({
            message: response.message,
            origin: "EmailVerification",
          });
        }
      } catch (error) {
        setError({
          message: "There was a problem while verifying email!",
          origin: "EmailVerification",
        });
      }
    }, [token]);

    return {
      submitToggleTwoFactor,
      submitEmailVerification,
    };
  }

  function useUserActions() {
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

    const submitUpdateName = async (data: z.infer<typeof UpdateNameSchema>) => {
      clearNotifications();
      const { name } = data;
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/updateName",
          { email: user?.email, name }
        );
        if (response.success) {
          setSuccess({ message: response.message, origin: "UpdateName" });
          setIsEditing(false);
          update(response.data);
        } else {
          setError({ message: response.message, origin: "UpdateName" });
        }
      } catch (error) {
        setError({
          message: "There was a problem while updating your name!",
          origin: "UpdateName",
        });
      }
    };

    const submitUpdateData = async (
      data: z.infer<typeof PersonalDataSchema>
    ) => {
      clearNotifications();
      const {
        fullName,
        birthDate,
        address,
        state,
        zipCode,
        city,
        country,
        phoneNumber,
      } = data;
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/updateData",
          {
            email: user?.email,
            fullName,
            birthDate,
            address,
            state,
            zipCode,
            city,
            country,
            phoneNumber,
          }
        );
        if (response.success) {
          setSuccess({ message: response.message, origin: "UpdateData" });
          update(response.data);
        } else {
          setError({ message: response.message, origin: "UpdateData" });
        }
      } catch (error) {
        setError({
          message: "There was a problem while updating your data!",
          origin: "UpdateData",
        });
      }
    };

    return {
      submitLoginForm,
      submitRegisterForm,
      submitNewPasswordForm,
      submitResetPasswordForm,
      submitChangePasswordForm,
      submitUpdateName,
      submitUpdateData,
    };
  }

  function useUserToken() {
    const sendToggleTwoFactorToken = async () => {
      clearNotifications();
      try {
        const response = await requestService.postMethod(
          "users/endpoints/tokenManagement/toggleTwoFactorToken",
          { email: user?.email }
        );
        if (response.success) {
          setSuccess({
            message: response.message,
            origin: "ToggleTwoFactorToken",
          });
          update(response.data);
        } else {
          setError({
            message: response.message,
            origin: "ToggleTwoFactorToken",
          });
        }
      } catch (error) {
        setError({
          message: "There was a problem while sending the two-factor token!",
          origin: "ToggleTwoFactorToken",
        });
      }
    };

    const sendChangePasswordToken = async (oldPassword: string) => {
      clearNotifications();
      startTransition(async () => {
        try {
          const response = await requestService.postMethod(
            "users/endpoints/tokenManagement/changePasswordToken",
            { email: user?.email, password: oldPassword }
          );
          if (response.success) {
            setSuccess({
              message: response.message,
              origin: "ChangePasswordToken",
            });
          } else {
            setError({
              message: response.message,
              origin: "ChangePasswordToken",
            });
          }
        } catch (error) {
          setError({
            message:
              "There was a problem while sending the change password token!",
            origin: "ChangePasswordToken",
          });
        }
      });
    };

    return {
      sendToggleTwoFactorToken,
      sendChangePasswordToken,
    };
  }

  return {
    clearNotifications,
    success,
    setSuccess,
    error,
    setError,
    showTwoFactor,
    setShowTwoFactor,
    isPending,
    setIsEditing,
    isEditing,
    providerError,
    useUserSecurity,
    useUserActions,
    useUserToken,
  };
}
