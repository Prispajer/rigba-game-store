import React from "react";
import { useSearchParams } from "next/navigation";
import submitRequest from "@/lib/submitRequest";
import useNotification from "@/hooks/useNotification";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import requestService from "@/services/RequestService";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import { HttpMethod } from "@/types/types";

export default function useSecurityHandlers() {
  const searchParams = useSearchParams();
  const { handleSuccess, handleError, handleReset } = useNotification();
  const { user } = useCurrentUser();

  const token = searchParams?.get("token");

  const submitToggleTwoFactor = async (code: string) => {
    const response = await submitRequest(
      HttpMethod.POST,
      "users/endpoints/userAuthentication/toggleTwoFactor",
      { email: user?.email, code },
      NotificationOrigin.ToggleTwoFactor,
      { handleSuccess, handleError, handleReset }
    );

    if (!response) return;
  };

  const submitEmailVerification = async () => {
    if (!token) {
      handleError("Missing token!", NotificationOrigin.EmailVerification);
      return;
    }

    const response = await submitRequest(
      HttpMethod.POST,
      "users/endpoints/userAuthentication/emailVerification",
      { token },
      NotificationOrigin.EmailVerification,
      { handleSuccess, handleError, handleReset }
    );

    if (!response) return;
  };

  return {
    submitToggleTwoFactor,
    submitEmailVerification,
  };
}
