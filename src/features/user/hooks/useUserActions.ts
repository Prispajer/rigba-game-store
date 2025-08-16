import React from "react";
import { z } from "zod";
import { PersonalDataSchema, UpdateNameSchema } from "@/utils/schemas/user";
import requestService from "@/services/RequestService";
import { useSearchParams } from "next/navigation";
import useNotifications from "@/hooks/useNotification";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import { RequestResponse } from "@/types/types";

function useUserActions() {
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

  const submitUpdateData = async (data: z.infer<typeof PersonalDataSchema>) => {
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
    submitUpdateName,
    submitUpdateData,
  };
}
