"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/utils/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "../Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "../Interface/Shared/FormsNotifications/FormError";
import requestService from "@/utils/classes/requestService";

export default function ResetPasswordContainer() {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const ResetPasswordObject = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = ResetPasswordObject;

  async function handleFormSubmit(data: z.infer<typeof ResetPasswordObject>) {
    startTransition(async () => {
      const { email } = data;

      try {
        const response = await requestService.postMethod(
          "users/endpoints/userAuthentication/resetPasswordUser",
          {
            email,
          }
        );

        clearMessages();
        if (response.success) {
          setSuccess(response.message);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    });
  }

  return (
    <main className="flex flex-col lg:flex-row justify-center items-center mx-auto lg:px-[100px] gap-x-[120px]">
      <h1 className="hidden lg:block text-[80px] leading-[90px] font-bold text-[white]">
        Chronimy
        <br />
        Cię!
      </h1>
      <div className="max-w-[300px] lg:min-w-[400px] py-[30px] px-[20px] lg:px-[40px] lg:bg-primaryColor">
        <div>
          <h2 className="text-[22px] font-bold tracking-wide text-[white] cursor-default">
            Nie pamiętasz hasła?
          </h2>
          <h3 className="cursor-default font-normal text-[14px] text-[#DFEDF2]">
            Wyślemy Ci wiadomość e-mail z linkiem umożliwiającym ustawienie
            nowego hasła
          </h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="py-4 text-white">
              <input
                {...register("email")}
                disabled={isPending}
                className="bg-secondaryColor  w-[100%] p-[15px]"
                type="text"
                name="email"
                placeholder="E-mail"
                autoCorrect="off"
              />
              {errors.email && <p>{errors.email.message as React.ReactNode}</p>}
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <div className="flex flex-col items-center justfiy-center w- pt-4">
              <button
                className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
                type="submit"
              >
                Potwierdź
              </button>
              <Link
                className="text-[14px] font-medium text-[#E2999B]"
                href="/login"
              >
                Wróc do login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
