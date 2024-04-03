import { workbench } from "../../utils/helpers/fonts";
import Link from "next/link";
import Image from "next/image";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-scree">
        <div className="flex flex-col justify-between flex-1 h-full">
          <header className="flex justify-between items-center py-2 px-4 bg-secondaryColor">
            <div>
              <Link className="flex items-center max-w-[200px]" href="/">
                <Image
                  src="/icons/logo.png"
                  width={60}
                  height={60}
                  alt="logo"
                  priority={true}
                />
                <span className="text-[30px] text-white">RIGBA</span>
              </Link>
            </div>
            <div>
              <button className="flex items-center">
                <span className="hidden md:flex pr-3 text-[#ffffff] font-[600]">
                  duzykox123@gmail.com
                </span>
                <Image
                  src="/icons/logo.png"
                  width={40}
                  height={40}
                  alt="user"
                ></Image>
              </button>
            </div>
          </header>
          {children}
          <footer className="text-center p-[5px] ">
            <div className="flex flex-col lg:flex-row justify-center items-center m-4 gap-6 lg:gap-8 text-[white] text-[14px]">
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
