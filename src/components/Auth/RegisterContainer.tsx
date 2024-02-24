"use client";

import { RootState } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "@/redux/user/userSlice";

export default function LoginContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleRegister = () => {
    dispatch(
      registerUser({
        id: 1,
        login: "example@example.com",
        password: "password123",
        registerDate: new Date(),
        lastLoggedIn: new Date(),
      })
    );
  };

  console.log(handleRegister);

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
        <form
          action="
          "
        >
          <div className="pt-4 text-white">
            <input
              className="bg-secondaryColor  w-[100%] p-[15px]"
              type="email"
              name="username"
              id="username"
              placeholder="E-mail"
              autoComplete="off"
            />
          </div>
          <div className="pt-4 text-white">
            <input
              className="bg-secondaryColor w-[100%] p-[15px]"
              type="password"
              name="password"
              id="password"
              placeholder="Hasło"
              autoComplete="off"
            />
          </div>
          <div className="pt-4 text-white">
            <input
              className="bg-secondaryColor  w-[100%] p-[15px]"
              type="password"
              name="password"
              id="password"
              placeholder="Powtórz hasło"
              autoComplete="off"
            />
          </div>
          <button
            className="text-[14px] text-[#E2999B] font-medium"
            type="button"
          >
            Pokaż hasło
          </button>
          <div className="flex flex-col items-center justfiy-center  py-4">
            <button
              onClick={() => dispatch(handleRegister())}
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
              <FaFacebookF size={20} color={"white"} />
              <span className="social-link-span text-[white]">
                Kontynuuj jako Facebook
              </span>
            </Link>
          </div>
          <div className="social-link bg-[#171d25]">
            <Link href="/social-connect/steam" className="flex items-center">
              <FaSteamSymbol size={20} color={"white"} />
              <span className="social-link-span  text-[white]">
                Kontynuuj jako Steam
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
