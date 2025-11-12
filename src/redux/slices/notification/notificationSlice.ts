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
        showSuccessNotification: (_, action: PayloadAction<NotificationPayload>) => ({
            success: true,
            message: action.payload.message,
            origin: action.payload.origin,
        }),
        showErrorNotification: (_, action: PayloadAction<NotificationPayload>) => ({
            success: false,
            message: action.payload.message,
            origin: action.payload.origin,
        }),
        clearNotification: () => initialState,
    },
});

export const {
    showSuccessNotification,
    showErrorNotification,
    clearNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;