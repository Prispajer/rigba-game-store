"use client";

import { z } from "zod";
import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { LoginSchema } from "@/utils/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/Interface/Shared/FormsNotifications/FormError";
import { FormSuccess } from "@/components/Interface/Shared/FormsNotifications/FormSuccess";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useAuthActions from "@/features/auth/hooks/useAuthHandlers";
import { signInAccount } from "@/features/user/hooks/useCurrentUser";
import SignInProvider from "@/shared/enums/signInProvider";
import useNotification from "@/hooks/useNotification";
import { NotificationOrigin } from "@/redux/slices/notification/notification.types";

export default function LoginContainer() {
  const {
    handleLoginSubmit,
    showTwoFactor,
    setShowTwoFactor,
    isPending,
    providerError,
  } = useAuthActions();
  const { successState, messageState, originState, handleShowErrorNotification } = useNotification();
  const { user } = useCurrentUser();

  const handleProviderLogin = async (provider: SignInProvider) => {
    try {
      await signInAccount(provider);
    } catch (error) {
        handleShowErrorNotification("Login failed. Please try again.", NotificationOrigin.Login);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await signInAccount(SignInProvider.Credentials, {
      email,
      password,
    });
  };

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = loginForm;

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center mx-auto lg:px-[50px] xl:px-[100px] gap-x-[120px]">
      <h1 className="hidden lg:block text-[80px] leading-[90px] font-bold text-[white]">
        Welcome!
        <br />
        Good to see you!
      </h1>
      <div className="min-w-[300px] lg:min-w-[400px]  py-[30px] px-[20px] lg:px-[40px] lg:bg-primaryColor">
        <div>
          <h2 className="text-[22px] font-bold tracking-wide text-[white] cursor-default">
            Login
          </h2>
          <h3 className="cursor-default font-normal text-[#DFEDF2]">
            Don't have an account?
            <Link className="ml-1 font-medium text-[#E2999B] " href="/register">
              Register
            </Link>
          </h3>
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
        <div className="flex items-center justify-center text-[#ffffff1f]">
          <div className="flex-1 border-[1px] border-[#ffffff1f] "></div>
          <span className="flex-0 px-2 cursor-default">or</span>
          <div className="flex-1 border-[1px] border-[#ffffff1f]"></div>
        </div>
        <>
          {!showTwoFactor && (
            <form
              onSubmit={handleSubmit((payload) =>
                handleLoginSubmit(payload, handleLogin)
              )}
            >
              <div className="pt-4 text-white">
                <input
                  {...register("email")}
                  disabled={isPending}
                  className="input"
                  type="text"
                  placeholder="E-mail"
                  autoCorrect="off"
                />
                {errors.email && (
                  <p className="text-red-500">
                    {errors.email.message as React.ReactNode}
                  </p>
                )}
              </div>
              <div className="py-4 text-white">
                <input
                  {...register("password")}
                  disabled={isPending}
                  className="input"
                  type="password"
                  placeholder="Password"
                  autoCorrect="off"
                />
                {errors.password && (
                  <p className="text-red-500">
                    {errors.password.message as React.ReactNode}
                  </p>
                )}
              </div>
                {successState && <FormSuccess
                message={
                  originState === "Login"
                    ? (messageState as string)
                    : ""
                }
              />}
                {!successState && <FormError
                message={
                  (originState === "Login"
                    ? (messageState as string)
                    : "") || providerError
                }
              />}
              <div className="flex flex-col items-center justfiy-center w- pt-4">
                <button
                  disabled={isPending}
                  className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
                  type="submit"
                >
                  Login
                </button>
                <Link
                  className="text-[14px] font-medium text-[#E2999B]"
                  href="/reset-password"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          )}
          {showTwoFactor && !user?.isTwoFactorEnabled && (
            <form
              onSubmit={handleSubmit((payload) =>
                handleLoginSubmit(payload, handleLogin)
              )}
            >
              <div className="pt-4 text-white">
                <input
                  {...register("code")}
                  disabled={isPending}
                  className="input"
                  placeholder="Two Factor Code"
                  autoCorrect="off"
                />
                {errors.code && (
                  <p className="text-red-500">
                    {errors.code.message as React.ReactNode}
                  </p>
                )}
              </div>
                {successState && <FormSuccess
                message={
                  originState === "Login"
                    ? (messageState as string)
                    : ""
                }
              />}
                {!successState && <FormError
                message={
                  (originState === "Login"
                    ? (messageState as string)
                    : "") || providerError
                }
              />}
              <div className="flex flex-col items-center justfiy-center w- pt-4">
                <button
                  disabled={isPending}
                  className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="text-[14px] font-medium text-[#E2999B]"
                  onClick={() => setShowTwoFactor(false)}
                >
                  Back to login
                </button>
              </div>
            </form>
          )}
        </>
      </div>
    </section>
  );
}
