import { RootState } from "@/redux/store";

export const selectSuccessState = (state: RootState) => state.notification.success;
export const selectMessageState = (state: RootState) => state.notification.message;
export const selectOriginState = (state: RootState) => state.notification.origin;

