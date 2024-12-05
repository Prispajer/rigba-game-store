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
} from "@/utils/schemas/user";
import { RequestResponse } from "@/utils/helpers/types";

export default function useUserServices() {
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const { handleClose } = useWindowVisibility();
  const { user, update } = useCurrentUser();
  const token = searchParams.get("token");
  const providerError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  function useUserSecurity() {
    const submitToggleTwoFactor = async (code: string) => {
      clearMessages();
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/toggleTwoFactor",
          { email: user?.email, code }
        );
        if (response.success) {
          setSuccess(response.message);
          update(response.data);
          handleClose("twoFactorModal");
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    };

    const submitEmailVerification = React.useCallback(async () => {
      if (!token) {
        setError("Missing token!");
        return;
      }
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/emailVerification",
          { token }
        );
        if (!response.success) {
          setError(response.message);
        }
        if (response.success) {
          setSuccess(response.message);
        }
      } catch (error) {
        setError("Something went wrong!");
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
      startTransition(async () => {
        clearMessages();
        const { email, password, code } = data;
        try {
          const response: RequestResponse<{
            token: boolean;
            emailVerified: string;
          }> = await requestService.postMethod(
            "users/endpoints/userAuthentication/loginUser",
            { email, password, code }
          );

          if (!response.success) {
            setError(response.message);
          }
          if (response.success) {
            setSuccess(response.message);

            if (response.data?.token) {
              setShowTwoFactor(true);
            }

            if (response.data?.emailVerified) {
              await callback(email, password);
            }
          }
        } catch (error) {
          setError("Something went wrong!");
        }
      });
    };

    const submitRegisterForm = async (data: z.infer<typeof RegisterSchema>) => {
      startTransition(async () => {
        clearMessages();
        const { email, password } = data;
        try {
          const response = await requestService.postMethod(
            "users/endpoints/userAuthentication/registerUser",
            { email, password }
          );

          if (!response.success) {
            setError(response.message);
          }
          if (response.success) {
            setSuccess(response.message);
          }
        } catch (error) {
          setError("Something went wrong!");
        }
      });
    };

    const submitNewPasswordForm = async (
      data: z.infer<typeof NewPasswordSchema>
    ) => {
      startTransition(async () => {
        clearMessages();
        const { password } = data;

        if (!token) {
          setError("Missing token!");
          return;
        }

        try {
          const response = await requestService.postMethod(
            "users/endpoints/userAuthentication/newPassword",
            {
              password,
              token,
            }
          );

          if (response.success) {
            setSuccess(response.message);
          } else {
            setError(response.message);
          }
        } catch (error) {
          setError("Something went wrong!");
        }
      });
    };

    const submitResetPasswordForm = async (
      data: z.infer<typeof ResetPasswordSchema>
    ) => {
      startTransition(async () => {
        clearMessages();
        const { email } = data;
        try {
          const response = await requestService.postMethod(
            "users/endpoints/tokenManagement/resetPasswordToken",
            { email }
          );
          if (response.success) {
            setSuccess(response.message);
          } else {
            setError(response.message);
          }
        } catch (error) {
          setError("Something went wrong!");
        }
      });
    };

    const submitChangePasswordForm = async (
      code: string,
      data: z.infer<typeof NewPasswordSchema>
    ) => {
      clearMessages();
      const { password } = data;
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/changePassword",
          {
            email: user?.email,
            newPassword: password,
            code,
          }
        );
        if (response.success) {
          setSuccess(response.message);
          handleClose("twoFactorModal");
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    };

    const submitUpdateData = async (
      data: z.infer<typeof PersonalDataSchema>
    ) => {
      clearMessages();
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
          setSuccess(response.message);
          update(response.data);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    };

    return {
      submitLoginForm,
      submitRegisterForm,
      submitNewPasswordForm,
      submitResetPasswordForm,
      submitChangePasswordForm,
      submitUpdateData,
    };
  }

  function useUserToken() {
    const sendToggleTwoFactorToken = async () => {
      clearMessages();
      try {
        const response = await requestService.postMethod(
          "users/endpoints/tokenManagement/toggleTwoFactorToken",
          { email: user?.email }
        );
        if (response.success) {
          setSuccess(response.message);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    };

    const sendChangePasswordToken = async (
      data: z.infer<typeof NewPasswordSchema>,
      oldPassword: string
    ) => {
      clearMessages();
      startTransition(async () => {
        try {
          const response = await requestService.postMethod(
            "users/endpoints/tokenManagement/changePasswordToken",
            {
              email: user?.email,
              password: oldPassword,
            }
          );
          if (response.success) {
            setSuccess(response.message);
          } else {
            setError(response.message);
          }
        } catch (error) {
          setError("Something went wrong!");
        }
      });
    };

    return {
      sendToggleTwoFactorToken,
      sendChangePasswordToken,
    };
  }

  return {
    clearMessages,
    success,
    setSuccess,
    error,
    setError,
    showTwoFactor,
    setShowTwoFactor,
    isPending,
    providerError,
    useUserSecurity,
    useUserActions,
    useUserToken,
  };
}
