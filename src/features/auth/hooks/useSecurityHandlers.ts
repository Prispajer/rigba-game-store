import { useSearchParams } from "next/navigation";
import submitRequest from "@/lib/submitRequest";
import useNotification from "@/hooks/useNotification";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";
import HttpMethod from "@/shared/enums/httpMethod";

export default function useSecurityHandlers() {
    const searchParams = useSearchParams();
    const {
        handleShowSuccessNotification,
        handleShowErrorNotification,
        handleClearNotification,
    } = useNotification();
    const { user } = useCurrentUser();

    const token = searchParams?.get("token");

    const handleSubmitToggleTwoFactor = async (code: string) => {
        const response = await submitRequest(
            HttpMethod.POST,
            "users/endpoints/userAuthentication/toggleTwoFactor",
            { email: user?.email, code },
            NotificationOrigin.ToggleTwoFactor,
            {
                handleShowSuccessNotification,
                handleShowErrorNotification,
                handleClearNotification,
            }
        );

        if (!response) return;
    };

    const handleSubmitEmailVerification = async () => {
        if (!token) {
            handleShowErrorNotification("Missing token!", NotificationOrigin.EmailVerification);
            return;
        }

        const response = await submitRequest(
            HttpMethod.POST,
            "users/endpoints/userAuthentication/emailVerification",
            { token },
            NotificationOrigin.EmailVerification,
            {
                handleShowSuccessNotification,
                handleShowErrorNotification,
                handleClearNotification,
            }
        );

        if (!response) return;
    };

    return {
        token,
        handleSubmitToggleTwoFactor,
        handleSubmitEmailVerification,
    };
}