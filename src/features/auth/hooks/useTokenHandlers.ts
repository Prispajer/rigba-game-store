import React from "react";
import submitRequest from "@/lib/submitRequest";
import useNotification from "@/hooks/useNotification";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import HttpMethod from "@/shared/enums/httpMethod";

export default function useTokenHandlers() {
    const [isPending, startTransition] = React.useTransition();

    const {
        handleShowSuccessNotification,
        handleShowErrorNotification,
        handleClearNotification,
    } = useNotification();

    const { user } = useCurrentUser();

    const handleSendToggleTwoFactorToken = async () => {
        const response = await submitRequest(
            HttpMethod.POST,
            "users/endpoints/tokenManagement/toggleTwoFactorToken",
            { email: user?.email },
            NotificationOrigin.ToggleTwoFactorToken,
            {
                handleShowSuccessNotification,
                handleShowErrorNotification,
                handleClearNotification,
            }
        );

        if (!response) return;
    };

    const handleSendChangePasswordToken = async (oldPassword: string) => {
        startTransition(async () => {
            const response = await submitRequest(
                HttpMethod.POST,
                "users/endpoints/tokenManagement/changePasswordToken",
                { email: user?.email, password: oldPassword },
                NotificationOrigin.ChangePasswordToken,
                {
                    handleShowSuccessNotification,
                    handleShowErrorNotification,
                    handleClearNotification,
                }
            );

            if (!response) return;
        });
    };

    return {
        isPending,
        handleSendToggleTwoFactorToken,
        handleSendChangePasswordToken,
    };
}