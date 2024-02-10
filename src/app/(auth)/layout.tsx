import { workbench } from "../../utils/fonts";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        <div className="flex flex-col flex-1 justify-between p-[15px] bg-[#1c365b]">
          <header>
            <Link className="flex items-center max-w-[200px]" href={"/"}>
              <Image
                src="/icons/logo.png"
                width={90}
                height={90}
                alt="logo"
                priority={true}
              />
              <span className="text-white text-[40px]">RIGBA</span>
            </Link>
          </header>
          {children}
          <footer className="text-center p-[5px] ">
            <div className="flex justify-center items-center gap-8 text-[white] text-[14px]">
              <button>Zmień język</button>
              <Link className="font-bold" href={"/terms-and-conditions"}>
                Regulamin
              </Link>
              <Link className="font-bold" href={"/support"}>
                Pomoc
              </Link>
              <span className="cursor-default">
                Copyright @ 2024 Rigba. Wszelkie prawa zastrzeżone
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
