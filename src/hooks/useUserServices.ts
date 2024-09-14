import React from "react";
import { useSearchParams } from "next/navigation";
import useCurrentUser from "./useCurrentUser";
import useWindowVisibility from "./useWindowVisibility";
import requestService from "@/utils/services/RequestService";
import { NewPasswordSchema, ResetPasswordSchema } from "@/utils/schemas/user";

export default function useUserServices() {
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { handleOpen, handleClose } = useWindowVisibility();
  const { user } = useCurrentUser();

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  function useUserSecurity() {
    const handleSendToggleTwoFactorToken = async () => {
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

    const handleToggleTwoFactor = async (code: string) => {
      clearMessages();
      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/toggleTwoFactor",
          { email: user?.email, code }
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

    return {
      handleSendToggleTwoFactorToken,
      handleToggleTwoFactor,
    };
  }

  function useUserActions() {
    const handleSetNewPassword = async (
      data: z.infer<typeof NewPasswordSchema>
    ) => {
      startTransition(async () => {
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
          clearMessages();
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

    const handleResetPassword = async (
      data: z.infer<typeof ResetPasswordSchema>
    ) => {
      startTransition(async () => {
        const { email } = data;
        try {
          const response = await requestService.postMethod(
            "users/endpoints/tokenManagement/resetPasswordToken",
            { email }
          );
          clearMessages();
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

    const handleChangePassword = async (
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

    return {
      handleSetNewPassword,
      handleResetPassword,
      handleChangePassword,
    };
  }

  function useUserToken() {
    const handleSendChangePasswordToken = async (
      data: z.infer<typeof NewPasswordSchema>,
      oldPassword: string
    ) => {
      clearMessages();
      startTransition(async () => {
        const { password } = data;
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
      handleSendChangePasswordToken,
    };
  }

  return {
    clearMessages,
    success,
    error,
    isPending,
    useUserSecurity,
    useUserActions,
    useUserToken,
  };
}
