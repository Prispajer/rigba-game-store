import React from "react";

import useCurrentUser from "./useCurrentUser";
import useWindowVisibility from "./useWindowVisibility";
import requestService from "@/utils/services/RequestService";

export default function useUserServices() {
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
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

  return {
    clearMessages,
    success,
    error,
    useUserSecurity,
  };
}
