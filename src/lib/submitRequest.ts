import requestService from "@/services/RequestService";
import { PayloadAction } from "@reduxjs/toolkit";
import { HttpMethod } from "@/types/types";
import {
  NotificationOrigin,
  NotificationPayload,
} from "@/redux/slices/notification/notification.types";

export default async function submitRequest<T>(
  method: HttpMethod,
  endpoint: string,
  payload: T,
  origin: NotificationOrigin,
  {
      handleShowSuccessNotification,
      handleShowErrorNotification,
      handleClearNotification,
  }: {
      handleShowSuccessNotification: (
      message: string,
      origin: NotificationOrigin
    ) => PayloadAction<NotificationPayload>;
      handleShowErrorNotification: (
      message: string,
      origin: NotificationOrigin
    ) => PayloadAction<NotificationPayload>;
      handleClearNotification: () => void;
  }
): Promise<any | null> {
    handleClearNotification();

  try {
    let response;

    switch (method) {
      case HttpMethod.GET:
        response = await requestService.getMethod(endpoint);
        break;
      case HttpMethod.POST:
        response = await requestService.postMethod(endpoint, payload);
        break;
      case HttpMethod.PATCH:
        response = await requestService.patchMethod(endpoint, payload);
        break;
      case HttpMethod.DELETE:
        response = await requestService.deleteMethod(endpoint, payload);
        break;
      default:
        throw new Error("Unsupported HTTP method");
    }

    if (!response.success) {
        handleShowErrorNotification(response.message, origin);
      return null;
    }

    handleShowSuccessNotification(response.message, origin);
    return response;
  } catch (error) {
      handleShowErrorNotification("There was a problem with the request!", origin);
    return null;
  }
}
