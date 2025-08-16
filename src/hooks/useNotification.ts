import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNotification } from "@/redux/slices/notification/notification.selectors";
import {
  showSuccess,
  showError,
  clearNotification,
} from "@/redux/slices/notification/notificationSlice";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";

export default function useNotification() {
  const dispatch = useDispatch();

  const notification = useSelector(selectNotification);

  React.useEffect(() => {
    if (notification.success) {
      const timer = setTimeout(() => {
        handleReset();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification.success]);

  const handleSuccess = (message: string, origin: NotificationOrigin) =>
    dispatch(showSuccess({ message, origin }));

  const handleError = (message: string, origin: NotificationOrigin) =>
    dispatch(showError({ message, origin }));

  const handleReset = () => dispatch(clearNotification());

  return {
    notification,
    handleSuccess,
    handleError,
    handleReset,
  };
}
