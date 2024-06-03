import React from "react";
import Image from "next/image";
import Link from "next/link";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function CheckoutLogo() {
  const { resolutionState } = useWindowVisibility();

  return (
    <div className="flex items-center flex-1">
      <Link className="flex items-center mr-[20px]" href="/">
        <div className="relative w-[60px] h-[55px] md:w-[80px] md:h-[80px]">
          <Image
            src="/icons/logo.png"
            layout="fill"
            alt="logo"
            priority={true}
          />
        </div>
        <span className="text-white text-[20px] md:text-[35px] font-[600]">
          {resolutionState ? "RIGBA" : "Koszyk"}
        </span>
      </Link>
    </div>
  );
}
