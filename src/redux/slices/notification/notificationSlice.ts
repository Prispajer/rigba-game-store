import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationState, NotificationPayload } from "./notification.types";

const initialState: NotificationState = {
  success: false,
  message: null,
  origin: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showSuccess: (_, action: PayloadAction<NotificationPayload>) => ({
      success: true,
      message: action.payload.message,
      origin: action.payload.origin,
    }),
    showError: (_, action: PayloadAction<NotificationPayload>) => ({
      success: false,
      message: action.payload.message,
      origin: action.payload.origin,
    }),
    clearNotification: () => ({
      success: false,
      message: null,
      origin: null,
    }),
  },
});

export const { showSuccess, showError, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
