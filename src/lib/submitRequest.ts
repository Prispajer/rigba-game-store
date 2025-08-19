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
    handleSuccess,
    handleError,
    handleReset,
  }: {
    handleSuccess: (
      message: string,
      origin: NotificationOrigin
    ) => PayloadAction<NotificationPayload>;
    handleError: (
      message: string,
      origin: NotificationOrigin
    ) => PayloadAction<NotificationPayload>;
    handleReset: () => void;
  }
): Promise<any | null> {
  handleReset();

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
      handleError(response.message, origin);
      return null;
    }

    handleSuccess(response.message, origin);
    return response;
  } catch (error) {
    handleError("There was a problem with the request!", origin);
    return null;
  }
}
