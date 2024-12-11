"use client";

import { z } from "zod";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { RegisterSchema } from "@/utils/schemas/user";
import { FormError } from "../Interface/Shared/FormsNotifications/FormError";
import { FormSuccess } from "../Interface/Shared/FormsNotifications/FormSuccess";
import { signInAccount } from "@/hooks/useCurrentUser";
import useUserServices from "@/hooks/useUserServices";
import { SignInProvider } from "@/utils/helpers/types";

export default function RegisterContainer() {
  const { success, error, isPending, useUserActions } = useUserServices();
  const { submitRegisterForm } = useUserActions();

  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = registerForm;

  const handleProviderLogin = async (provider: SignInProvider) => {
    await signInAccount(provider);
  };

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center mx-auto lg:px-[50px] xl:px-[100px] gap-x-[120px]">
      <h1 className="hidden lg:block text-[80px] leading-[90px] font-bold text-[white]">
        Welcome!
        <br />
        Good to see you!
      </h1>
      <div className="min-w-[300px] lg:min-w-[400px] py-[30px] px-[20px] lg:px-[40px] lg:bg-primaryColor">
        <div>
          <h2 className="text-[22px] font-bold tracking-wide text-[white] cursor-default">
            Create account
          </h2>
          <h3 className="cursor-default font-normal text-[#DFEDF2]">
            Already have an account?
            <Link className="ml-1 font-medium text-[#E2999B] " href="/login">
              Login
            </Link>
          </h3>
        </div>
        <form onSubmit={handleSubmit(submitRegisterForm)}>
          <div className="pt-4 text-white">
            <input
              {...register("email")}
              disabled={isPending}
              className="input"
              type="text"
              placeholder="E-mail"
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500">
                {errors.email.message as React.ReactNode}
              </p>
            )}
          </div>
          <div className="pt-4 text-white">
            <input
              {...register("password")}
              disabled={isPending}
              className="input"
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
            {errors.password && (
              <p className="text-red-500">
                {errors.password.message as React.ReactNode}
              </p>
            )}
          </div>
          <div className="py-4 text-white">
            <input
              {...register("confirmPassword")}
              disabled={isPending}
              className="input"
              type="password"
              placeholder="Repeat password"
              autoComplete="off"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">
                {errors.confirmPassword.message as React.ReactNode}
              </p>
            )}
          </div>
          <FormSuccess message={success as string} />
          <FormError message={error as string} />
          <div className="flex flex-col items-center justfiy-center py-4">
            <button
              disabled={isPending}
              className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
              type="submit"
            >
              Create account
            </button>
          </div>
          <div className="flex flex-col pb-4 leading-[16px] cursor-default">
            <span className="requirements">At least eight letters</span>
            <span className="requirements">
              At least one number or special character
            </span>
            <span className="requirements">At least one capital letter</span>
          </div>
        </form>
        <div className="flex items-center justify-center text-[#ffffff1f]">
          <div className="flex-1 border-[1px] border-[#ffffff1f] "></div>
          <span className="flex-0 px-2 cursor-default">albo</span>
          <div className="flex-1 border-[1px] border-[#ffffff1f]"></div>
        </div>
        <div className="">
          <div
            className="social-link bg-[#FFFFFF] hover:bg-[#efeded]"
            onClick={() => handleProviderLogin(SignInProvider.Google)}
          >
            <FaGoogle size={20} color="black" />
            <span className="social-link-span  text-[black]">
              Continue as Google
            </span>
          </div>
          <div
            className="social-link bg-[#5266fc] hover:bg-[#5257fc]"
            onClick={() => handleProviderLogin(SignInProvider.Facebook)}
          >
            <FaFacebookF size={20} color="white" />
            <span className="social-link-span text-[white]">
              Continue as Facebook
            </span>
          </div>
          <div
            className="social-link bg-[#7289da] hover:bg-[#7280da]"
            onClick={() => handleProviderLogin(SignInProvider.Discord)}
          >
            <FaDiscord size={20} color="white" />
            <span className="social-link-span  text-[white]">
              Continue as Discord
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
