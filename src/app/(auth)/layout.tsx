import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-between min-w-full min-h-[100vh] h-max lg:bg-[#122339] bg-primaryColor">
      <div className="flex flex-col justify-between flex-1 min-h-[100vh] h-max">
        <header>
          <Link className="flex items-center pl-3 pt-3 max-w-[200px]" href="/">
            <Image
              src="/icons/logo.png"
              width="90"
              height="90"
              alt="logo"
              priority={true}
            />
            <span className="text-[40px] text-white">RIGBA</span>
          </Link>
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
    </section>
  );
}
