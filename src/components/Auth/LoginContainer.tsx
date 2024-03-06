"use client";

import React from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa";
import { LoginSchema } from "@/utils/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginContainer() {
  const loginObject = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = loginObject;

  function handleFormSubmit(data: z.infer<typeof LoginSchema>) {
    const { email, password } = data;
    fetch(
      "http://localhost:3000/api/users/breakpoints/userAuthentication/loginUser",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json();
        } else {
          console.error("Wystąpił błąd podczas logowania użytkownika.");
        }
      })
      .catch((error) => {
        console.error(
          "Wystąpił błąd podczas wysyłania żądania logowania użytkownika:",
          error
        );
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
          <div className="social-link bg-[#FFFFFF]">
            <Link href="/social-connect/google" className="flex items-center">
              <FaGoogle size={20} color="black" />
              <span className="social-link-span  text-[black]">
                Kontynuuj jako Google
              </span>
            </Link>
          </div>
          <div className="social-link bg-[#5266fc]">
            <Link href="/social-connect/facebook" className="flex items-center">
              <FaFacebookF size={20} color="white" />
              <span className="social-link-span text-[white]">
                Kontynuuj jako Facebook
              </span>
            </Link>
          </div>
          <div className="social-link bg-[#171d25]">
            <Link href="/social-connect/steam" className="flex items-center">
              <FaSteamSymbol size={20} color="white" />
              <span className="social-link-span  text-[white]">
                Kontynuuj jako Steam
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center text-[#ffffff1f]">
          <div className="flex-1 border-[1px] border-[#ffffff1f] "></div>
          <span className="flex-0 px-2 cursor-default">albo</span>
          <div className="flex-1 border-[1px] border-[#ffffff1f]"></div>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="pt-4 text-white">
            <input
              {...register("email")}
              className="bg-secondaryColor  w-[100%] p-[15px]"
              type="text"
              name="email"
              placeholder="E-mail"
              autoCorrect="off"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="pt-4 text-white">
            <input
              {...register("password")}
              className="bg-secondaryColor   w-[100%] p-[15px]"
              type="password"
              name="password"
              placeholder="Hasło"
              autoCorrect="off"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="flex flex-col items-center justfiy-center w- pt-4">
            <button
              className="text-buttonTextColor font-semibold	w-full bg-buttonBackground hover:bg-buttonBackgroundHover transition duration-300 p-[10px]"
              type="submit"
            >
              Zaloguj się
            </button>
            <Link
              className="text-[14px] font-medium text-[#E2999B]"
              href="/forgot-password"
            >
              Nie pamiętasz hasła?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
