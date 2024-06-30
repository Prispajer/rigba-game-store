"use client";
import React from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { FormSuccess } from "../Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "../Interface/Shared/FormsNotifications/FormError";
import requestService from "@/utils/classes/requestService";

export default function EmailVerificationContainer() {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = React.useCallback(async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const response = await requestService.postMethod(
        "users/endpoints/tokenManagement/emailVerification",
        { token }
      );

      if (!response.success) {
        setError(response.message);
      }
      if (response.success) {
        setSuccess(response.message);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  }, [token]);

  React.useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <main className="flex-col  justify-center items-center mx-auto p-[20px]  lg:px-[100px] gap-x-[120px]">
      <h1 className=" text-[60px] leading-[70px] font-bold text-[white] cursor-default ">
        <span className="flex justify-center text-center">
          Oczekiwanie na potwierdzenie adresu email
        </span>
      </h1>
      <div className="flex justify-center text-center mt-[40px]">
        <FormSuccess message={success} />
        <FormError message={error} />
        {!success && !error && <MoonLoader />}
      </div>
      <div className="flex items-center  justify-center w-full mt-[60px]">
        <Link
          href="/login"
          className="w-[200px] p-[15px] text-center text-buttonTextColor bg-buttonBackground hover:bg-buttonBackgroundHover"
        >
          Wróć do logowania
        </Link>
      </div>
    </main>
  );
}
