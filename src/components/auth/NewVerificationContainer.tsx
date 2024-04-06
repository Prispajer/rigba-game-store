"use client";
import React from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/utils/tools/new-verification";

const NewVerificationContainer = () => {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = React.useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    });
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
        <MoonLoader />
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
};

export default NewVerificationContainer;
