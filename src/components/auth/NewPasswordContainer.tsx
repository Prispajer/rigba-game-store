"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "../Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "../Interface/Shared/FormsNotifications/FormError";
import useUserServices from "@/hooks/useUserServices";
import { NewPasswordSchema } from "@/utils/schemas/user";

export default function ResetPasswordContainer() {
  const { success, error, isPending, useUserActions } = useUserServices();
  const { submitNewPasswordForm } = useUserActions();

  const resetPasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = resetPasswordForm;

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center mx-auto lg:px-[100px] gap-x-[120px]">
      <h1 className="hidden lg:block text-[80px] leading-[90px] font-bold text-[white]">
        We protect
        <br />
        You!
      </h1>
      <div className="max-w-[300px] lg:min-w-[400px] py-[30px] px-[20px] lg:px-[40px] lg:bg-primaryColor">
        <div>
          <h2 className="text-[22px] font-bold tracking-wide leading-none text-[white] cursor-default ">
            New password
          </h2>
          <Link
            className="text-[14px] font-medium text-[#E2999B]"
            href="/login"
          >
            Back to login
          </Link>
          <form onSubmit={handleSubmit(submitNewPasswordForm)}>
            <div className="pt-4 text-white">
              <input
                {...register("password")}
                disabled={isPending}
                className="bg-secondaryColor  w-[100%] p-[15px]"
                type="password"
                placeholder="Password"
                autoCorrect="off"
              />
              {errors.password && (
                <p>{errors.password.message as React.ReactNode}</p>
              )}
            </div>
            <div className="pt-4 text-white">
              <input
                {...register("confirmPassword")}
                disabled={isPending}
                className="bg-secondaryColor  w-[100%] p-[15px]"
                type="password"
                placeholder="Repeat password"
                autoCorrect="off"
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message as React.ReactNode}</p>
              )}
            </div>
            <div className="flex flex-col py-4 leading-[16px] cursor-default">
              <span className="requirements">At least eight letters</span>
              <span className="requirements">
                At least one number or special character
              </span>
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <div className="flex flex-col items-center justfiy-center w- ">
              <button
                className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px] mt-4"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
