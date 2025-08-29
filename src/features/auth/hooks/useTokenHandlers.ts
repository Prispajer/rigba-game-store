import React from "react";
import submitRequest from "@/lib/submitRequest";
import useNotification from "@/hooks/useNotification";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import { HttpMethod } from "@/types/types";

export default function useTokenHandlers() {
  const [isPending, startTransition] = React.useTransition();

  const { handleSuccess, handleError, handleReset } = useNotification();
  const { user } = useCurrentUser();

  const handleSendToggleTwoFactorToken = async () => {
    const response = await submitRequest(
      HttpMethod.POST,
      "users/endpoints/tokenManagement/toggleTwoFactorToken",
      { email: user?.email },
      NotificationOrigin.ToggleTwoFactorToken,
      { handleSuccess, handleError, handleReset }
    );

    if (!response) return;
  };

  const handleSendChangePasswordToken = async (oldPassword: string) => {
    startTransition(async () => {
      const response = await submitRequest(
        HttpMethod.POST,
        "users/endpoints/tokenManagement/changePasswordToken",
        { email: user?.email, password: oldPassword },
        NotificationOrigin.ChangePasswordToken,
        { handleSuccess, handleError, handleReset }
      );

      if (!response) return;
    });
  };

  return {
    isPending,
    handleSendToggleTwoFactorToken,
    handleSendChangePasswordToken,
  };
}
