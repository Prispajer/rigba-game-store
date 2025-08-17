import React from "react";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import useCurrentUser from "../features/user/hooks/useCurrentUser";
import useWindowVisibility from "./useUIVisibility";
import requestService from "@/services/RequestService";
import { PersonalDataSchema, UpdateNameSchema } from "@/utils/schemas/user";

export default function useUserServices() {
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

    const submitEmailVerification = async () => {
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
    };

    return {
      submitToggleTwoFactor,
      submitEmailVerification,
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
    isPending,
    setIsEditing,
    isEditing,
    providerError,
    useUserSecurity,
    useUserActions,
    useUserToken,
  };
}
