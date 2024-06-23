"use client";

import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { RegisterSchema } from "@/utils/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "../Interface/Shared/FormsNotifications/FormError";
import { FormSuccess } from "../Interface/Shared/FormsNotifications/FormSuccess";
import { signInAccount } from "@/utils/actions";
import { SignInProvider } from "@/utils/helpers/types";

export default function RegisterContainer() {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();
  const registerObject = useForm<z.infer<typeof RegisterSchema>>({
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
  } = registerObject;

  const handleProviderLogin = async (provider: SignInProvider) => {
    await signInAccount(provider);
  };

  function handleFormSubmit(data: z.infer<typeof RegisterSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      const { email, password } = data;
      try {
        fetch(
          "http://localhost:3000/api/users/breakpoints/userAuthentication/registerUser",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              setSuccess(data.success);
            }
            if (data.error) {
              setError(data.error);
            }
          })
          .catch(() => {
            setError("Something went wrong!");
          });
      } catch (error) {
        setError("An error has occured while creating account!");
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
            Stwórz konto
          </h2>
          <h3 className="cursor-default font-normal text-[#DFEDF2]">
            Masz już konto?
            <Link className="ml-1 font-medium text-[#E2999B] " href="/login">
              Zaloguj się
            </Link>
          </h3>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="pt-4 text-white">
            <input
              {...register("email")}
              disabled={isPending}
              className="input"
              type="text"
              placeholder="E-mail"
              autoComplete="off"
            />
            {errors.email && <p>{errors.email.message as React.ReactNode}</p>}
          </div>
          <div className="pt-4 text-white">
            <input
              {...register("password")}
              disabled={isPending}
              className="input"
              type="password"
              placeholder="Hasło"
              autoComplete="off"
            />
            {errors.password && (
              <p>{errors.password.message as React.ReactNode}</p>
            )}
          </div>
          <div className="py-4 text-white">
            <input
              {...register("confirmPassword")}
              disabled={isPending}
              className="input"
              type="password"
              placeholder="Powtórz hasło"
              autoComplete="off"
            />
            {errors.confirmPassword && (
              <p>{errors.confirmPassword.message as React.ReactNode}</p>
            )}
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <div className="flex flex-col items-center justfiy-center py-4">
            <button
              disabled={isPending}
              className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
              type="submit"
            >
              Stwórz konto
            </button>
          </div>
          <div className="flex flex-col pb-4 leading-[16px] cursor-default">
            <span className="requirements">Co najmniej 8 liter</span>
            <span className="requirements">
              Co najmniej jedna cyfra lub znak specjalny
            </span>
            <span className="requirements">Co najmniej jedna duża litera</span>
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
            onClick={() => handleProviderLogin("google")}
          >
            <FaGoogle size={20} color="black" />
            <span className="social-link-span  text-[black]">
              Kontynuuj jako Google
            </span>
          </div>
          <div
            className="social-link bg-[#5266fc] hover:bg-[#5257fc]"
            onClick={() => handleProviderLogin("facebook")}
          >
            <FaFacebookF size={20} color="white" />
            <span className="social-link-span text-[white]">
              Kontynuuj jako Facebook
            </span>
          </div>
          <div
            className="social-link bg-[#7289da] hover:bg-[#7280da]"
            onClick={() => handleProviderLogin("discord")}
          >
            <FaDiscord size={20} color="white" />
            <span className="social-link-span  text-[white]">
              Kontynuuj jako Discord
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
