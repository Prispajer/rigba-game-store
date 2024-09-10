"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/utils/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FormSuccess } from "../Interface/Shared/FormsNotifications/FormSuccess";
import { FormError } from "../Interface/Shared/FormsNotifications/FormError";
import requestService from "@/utils/classes/RequestService";

export default function ResetPasswordContainer() {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
  } = resetPasswordForm;

  async function handleFormSubmit(data: z.infer<typeof NewPasswordSchema>) {
    startTransition(async () => {
      const { password } = data;

      if (!token) {
        setError("Missing token!");
        return;
      }

      try {
        const response = await requestService.postMethod(
          "users/endpoints/tokenManagement/newPasswordToken",
          {
            password,
            token,
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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
