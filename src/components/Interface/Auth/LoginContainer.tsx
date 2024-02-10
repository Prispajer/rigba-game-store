import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSteamSymbol } from "react-icons/fa";

export default function LoginContainer() {
  return (
    <main className="flex justify-center items-center w-full gap-[50px]">
      <h1 className="block text-[80px] text-[white]">
        Witaj!
        <br />
        Miło Cię widzieć!
      </h1>
      <div className="flex flex-col max-w-[380px]">
        <div className="min-w-[380px] py-[30px] px-[40px] bg-[#296CA6]">
          <div>
            <h2 className="text-[22px] font-bold tracking-wide text-[white]">
              Zaloguj się
            </h2>
            <h3 className="font-normal cursor-default text-[#DFEDF2]">
              Nie masz konta?
              <Link className="text-[#E2999B] ml-1" href="/register">
                Zarejestruj się
              </Link>
            </h3>
          </div>
          <div className="mt-6">
            <div className="platforms bg-[#FFFFFF]">
              <Link href="/social-connect/google" className="flex items-center">
                <FaGoogle size={20} color={"black"} />
                <span className="platforms-span  text-[black]">
                  Kontynuuj jako Google
                </span>
              </Link>
            </div>
            <div className="platforms bg-[#5266fc]">
              <Link
                href="/social-connect/facebook"
                className="flex items-center"
              >
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
        </div>
      </div>
    </main>
  );
}
