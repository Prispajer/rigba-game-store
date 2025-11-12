import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    showSuccessNotification,
    showErrorNotification,
    clearNotification,
} from "@/redux/slices/notification/notificationSlice";
import { selectSuccessState, selectMessageState, selectOriginState } from "@/redux/slices/notification/notification.selectors";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";

export default function useNotification() {
    const dispatch = useDispatch();

    const successState = useSelector(selectSuccessState);
    const messageState = useSelector(selectMessageState);
    const originState = useSelector(selectOriginState);

    const handleShowSuccessNotification = React.useCallback(
        (message: string, origin: NotificationOrigin) =>
            dispatch(showSuccessNotification({ message, origin })),
        [dispatch]
    );

    const handleShowErrorNotification = React.useCallback(
        (message: string, origin: NotificationOrigin) =>
            dispatch(showErrorNotification({ message, origin })),
        [dispatch]
    );

    const handleClearNotification = React.useCallback(
        () => dispatch(clearNotification()),
        [dispatch]
    );

    React.useEffect(() => {
        if (messageState) {
            const timer = setTimeout(() => {
                handleClearNotification();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [messageState, handleClearNotification]);

    return {
        successState,
        messageState,
        originState,
        handleShowSuccessNotification,
        handleShowErrorNotification,
        handleClearNotification,
    };
}