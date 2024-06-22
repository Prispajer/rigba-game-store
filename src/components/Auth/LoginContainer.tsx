"use client";

import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { LoginSchema } from "@/utils/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { FormError } from "../Interface/Shared/FormsNotifications/FormError";
import { FormSuccess } from "../Interface/Shared/FormsNotifications/FormSuccess";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

export default function LoginContainer() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const handleProviderClick = async (
    provider: "google" | "facebook" | "discord"
  ) => {
    await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const handleLogin = async (email: string, password: string) => {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const loginObject = useForm<z.infer<typeof LoginSchema>>({
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
  } = loginObject;

  async function handleFormSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      setError("");
      setSuccess("");

      const { email, password, code } = data;

      try {
        fetch(
          "http://localhost:3000/api/users/breakpoints/userAuthentication/loginUser",
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email, password, code }),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data?.error) {
              setError(data.error);
            }
            if (data?.success) {
              setSuccess(data.success);
              if (data.emailVerified) {
                handleLogin(email, password);
              }
            }
            if (data?.twoFactor) {
              setShowTwoFactor(true);
            }
          })
          .catch(() => {
            setError("Something went wrong!");
          });
      } catch (error) {
        setError("There was error while logging into user!");
      }
    });
  }

  return (
    <main className="flex flex-col lg:flex-row justify-center items-center mx-auto lg:px-[100px] gap-x-[120px]">
      <h1 className="hidden lg:block text-[80px] leading-[90px] font-bold text-[white]">
        Witaj!
        <br />
        Miło Cię widzieć!
      </h1>
      <div className="min-w-[300px] lg:min-w-[400px] py-[30px] px-[20px] lg:px-[40px] lg:bg-primaryColor">
        <div>
          <h2 className="text-[22px] font-bold tracking-wide text-[white] cursor-default">
            Zaloguj się
          </h2>
          <h3 className="cursor-default font-normal text-[#DFEDF2]">
            Nie masz konta?
            <Link className="ml-1 font-medium text-[#E2999B] " href="/register">
              Zarejestruj się
            </Link>
          </h3>
        </div>
        <div className="">
          <div
            className="social-link bg-[#FFFFFF] hover:bg-[#efeded]"
            onClick={() => handleProviderClick("google")}
          >
            <FaGoogle size={20} color="black" />
            <span className="social-link-span  text-[black]">
              Kontynuuj jako Google
            </span>
          </div>
          <div
            className="social-link bg-[#5266fc] hover:bg-[#5257fc]"
            onClick={() => handleProviderClick("facebook")}
          >
            <FaFacebookF size={20} color="white" />
            <span className="social-link-span text-[white]">
              Kontynuuj jako Facebook
            </span>
          </div>
          <div
            className="social-link bg-[#7289da] hover:bg-[#7280da]"
            onClick={() => handleProviderClick("discord")}
          >
            <FaDiscord size={20} color="white" />
            <span className="social-link-span  text-[white]">
              Kontynuuj jako Discord
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center text-[#ffffff1f]">
          <div className="flex-1 border-[1px] border-[#ffffff1f] "></div>
          <span className="flex-0 px-2 cursor-default">albo</span>
          <div className="flex-1 border-[1px] border-[#ffffff1f]"></div>
        </div>
        <>
          {!showTwoFactor && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  <p>{errors.email.message as React.ReactNode}</p>
                )}
              </div>
              <div className="py-4 text-white">
                <input
                  {...register("password")}
                  disabled={isPending}
                  className="input"
                  type="password"
                  placeholder="Hasło"
                  autoCorrect="off"
                />
                {errors.password && (
                  <p>{errors.password.message as React.ReactNode}</p>
                )}
              </div>
              <FormSuccess message={success} />
              <FormError message={error || urlError} />
              <div className="flex flex-col items-center justfiy-center w- pt-4">
                <button
                  disabled={isPending}
                  className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
                  type="submit"
                >
                  Zaloguj się
                </button>
                <Link
                  className="text-[14px] font-medium text-[#E2999B]"
                  href="/reset-password"
                >
                  Nie pamiętasz hasła?
                </Link>
              </div>
            </form>
          )}
          {showTwoFactor && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="pt-4 text-white">
                <input
                  {...register("code")}
                  disabled={isPending}
                  className="input"
                  placeholder="Two Factor Code"
                  autoCorrect="off"
                />
                {errors.code && <p>{errors.code.message as React.ReactNode}</p>}
              </div>
              <FormSuccess message={success} />
              <FormError message={error || urlError} />
              <div className="flex flex-col items-center justfiy-center w- pt-4">
                <button
                  disabled={isPending}
                  className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
                  type="submit"
                >
                  Potwierdź
                </button>
                <Link
                  className="text-[14px] font-medium text-[#E2999B]"
                  href="/login"
                >
                  Wróć do login
                </Link>
              </div>
            </form>
          )}
        </>
      </div>
    </main>
  );
}
