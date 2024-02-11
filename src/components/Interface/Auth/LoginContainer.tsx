import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa";

export default function LoginContainer() {
  return (
    <main className="flex flex-col lg:flex-row justify-center items-center mx-auto lg:px-[100px] gap-x-[120px]">
      <h1 className="hidden lg:block text-[80px] leading-[90px] font-bold text-[white]">
        Witaj!
        <br />
        Miło Cię widzieć!
      </h1>
      <div className="min-w-[380px] py-[30px] px-[40px] lg:bg-[#296CA6]">
        <div>
          <h2 className="text-[22px] font-bold tracking-wide text-[white]">
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
          <div className="platforms bg-[#FFFFFF]">
            <Link href="/social-connect/google" className="flex items-center">
              <FaGoogle size={20} color={"black"} />
              <span className="platforms-span  text-[black]">
                Kontynuuj jako Google
              </span>
            </Link>
          </div>
          <div className="platforms bg-[#5266fc]">
            <Link href="/social-connect/facebook" className="flex items-center">
              <FaFacebookF size={20} color={"white"} />
              <span className="platforms-span text-[white]">
                Kontynuuj jako Facebook
              </span>
            </Link>
          </div>
          <div className="platforms bg-[#171d25]">
            <Link href="/social-connect/steam" className="flex items-center">
              <FaSteamSymbol size={20} color={"white"} />
              <span className="platforms-span  text-[white]">
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
        <form
          action="
          "
        >
          <div className="py-4">
            <input
              className="bg-[#244673]  w-[100%] p-[15px]"
              type="email"
              name="username"
              id="username"
              placeholder="E-mail"
              autoCorrect="off"
            />
          </div>
          <div className="">
            <input
              className="bg-[#244673]  w-[100%] p-[15px]"
              type="password"
              name="password"
              id="password"
              placeholder="Hasło"
              autoCorrect="off"
            />
          </div>
          <button
            className="text-[14px] text-[#E2999B] font-medium"
            type="button"
          >
            Pokaż hasło
          </button>
          <div className="flex flex-col items-center justfiy-center w- pt-4">
            <button
              className="text-[black] font-semibold	w-full bg-[#BF6597] p-[10px]"
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
