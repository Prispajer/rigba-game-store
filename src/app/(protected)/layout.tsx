import Link from "next/link";
import AccountNavbar from "./_components/AccountNavbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <div className="flex flex-col justify-between flex-1 h-full">
          <AccountNavbar />
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
