import Link from "next/link";

export default function AuthFooter() {
  return (
    <footer className="text-center p-[5px] ">
      <div className="flex flex-col lg:flex-row justify-center items-center m-4 gap-6 lg:gap-8 text-[white] text-[14px]">
        <button>Change language</button>
        <Link className="font-bold" href={"/terms-and-conditions"}>
          Terms & Conditions
        </Link>
        <Link className="font-bold" href={"/support"}>
          Support
        </Link>
        <span className="cursor-default">
          Copyright @ 2024 Rigba. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
