"use client";
import React from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import useSecurityHandlers from "@/features/auth/hooks/useSecurityHandlers";
import useNotification from "@/hooks/useNotification";

export default function EmailVerificationContainer() {
    const [isLoading, setIsLoading] = React.useState(false);

    const { token, handleSubmitEmailVerification } = useSecurityHandlers();
    const { successState, messageState, originState } = useNotification();

    React.useEffect(() => {
        (async () => {
            if (token) {
                setIsLoading(true);
                await handleSubmitEmailVerification();
                setIsLoading(false);
            }
        })();
    }, [token]);

    return (
        <section className="flex flex-col justify-center items-center mx-auto lg:px-[50px] xl:px-[100px] gap-x-[120px]">
            <h1 className="text-[60px] leading-[70px] font-bold text-[white] cursor-default">
        <span className="flex justify-center text-center">
          Waiting for email address confirmation
        </span>
            </h1>
            <div className="flex justify-center text-center mt-[40px]">
                {successState && <FormSuccess
                    message={
                    originState === "EmailVerification"
                            ? (messageState as string)
                            : ""
                    }
                />}
                {!successState && <FormError
                    message={
                        originState === "EmailVerification"
                            ? (messageState as string)
                            : ""
                    }
                />}
                {isLoading && <MoonLoader />}
            </div>
            <div className="flex items-center justify-center w-full mt-[60px]">
                <Link
                    href="/login"
                    className="w-[200px] p-[15px] text-center text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover"
                >
                    Back to login
                </Link>
            </div>
        </section>
    );
}