import React from "react";
import { z } from "zod";
import { PersonalDataSchema, UpdateNameSchema } from "@/utils/schemas/user";
import submitRequest from "@/lib/submitRequest";
import useNotification from "@/hooks/useNotification";
import useCurrentUser from "./useCurrentUser";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import HttpMethod from "@/shared/enums/httpMethod";

export default function useUserHandlers() {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const { user, update } = useCurrentUser();
  const { handleShowSuccessNotification, handleShowErrorNotification, handleClearNotification } = useNotification();

  const handleUpdateNameSubmit = async (
    payload: z.infer<typeof UpdateNameSchema>
  ) => {
    const { name } = payload;

    const response = await submitRequest(
      HttpMethod.POST,
      "users/endpoints/userAuthentication/updateName",
      { email: user?.email, name },
      NotificationOrigin.UpdateName,
      { handleShowSuccessNotification, handleShowErrorNotification, handleClearNotification }
    );

    if (!response) return;

    if (response.success) {
      setIsEditing(false);
      await update(response.data);
    }
  };

  const handleUpdateDataSubmit = async (
    payload: z.infer<typeof PersonalDataSchema>
  ) => {
    const {
      fullName,
      birthDate,
      address,
      state,
      zipCode,
      city,
      country,
      phoneNumber,
    } = payload;

    const response = await submitRequest(
      HttpMethod.POST,
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
      },
      NotificationOrigin.UpdateData,
      { handleShowSuccessNotification, handleShowErrorNotification, handleClearNotification }
    );

    if (!response) return;

    if (response.success) {
      await update(response.data);
    }
  };

  return {
    isEditing,
    setIsEditing,
    handleUpdateNameSubmit,
    handleUpdateDataSubmit,
  };
}
