"use client";

import { z } from "zod";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/utils/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import useAuthHandlers from "@/features/auth/hooks/useAuthHandlers";
import useNotification from "@/hooks/useNotification";
import {NotificationOrigin} from "@/redux/slices/notification/notification.types";

export default function ResetPasswordContainer() {
  const { isPending, handleResetPasswordSubmit } = useAuthHandlers();
  const { successState, messageState, originState } = useNotification();

  const ResetPasswordObject = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = ResetPasswordObject;

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center mx-auto lg:px-[50px] xl:px-[100px] gap-x-[120px]">
      <h1 className="hidden lg:block text-[80px] leading-[90px] font-bold text-[white]">
        We protect
        <br />
        You!
      </h1>
      <div className="max-w-[300px] lg:min-w-[400px] py-[30px] px-[20px] lg:px-[40px] lg:bg-primaryColor">
        <div>
          <h2 className="text-[22px] font-bold tracking-wide text-[white] cursor-default">
            Forgot your password?
          </h2>
          <h3 className="cursor-default font-normal text-[14px] text-[#DFEDF2]">
            We will send you an email with a link to set a new password
          </h3>
          <form onSubmit={handleSubmit(handleResetPasswordSubmit)}>
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
              {errors.email && (
                <p className="text-red-500">
                  {errors.email.message as React.ReactNode}
                </p>
              )}
            </div>
              {successState && <FormSuccess
              message={
                  originState === NotificationOrigin.ResetPassword
                  ? (messageState as string)
                  : ""
              }
            />}
              {!successState && <FormError
              message={
                  originState === NotificationOrigin.ResetPassword
                  ? (messageState as string)
                  : ""
              }
            />}
            <div className="flex flex-col items-center justfiy-center w- pt-4">
              <button
                className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
                type="submit"
              >
                Submit
              </button>
              <Link
                className="text-[14px] font-medium text-[#E2999B]"
                href="/login"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
