import React from "react";
import Image from "next/image";
import Link from "next/link";
import useUiVisibility from "@/hooks/useUiVisibility";

export default function CheckoutLogo({
  mobileLogoTitle,
}: {
  mobileLogoTitle: string;
}) {
  const { resolutionState } = useUiVisibility();

  return (
    <div className="flex items-center ">
      <Link className="flex items-center" href="/">
        <div className="relative w-[60px] h-[55px] md:w-[80px] md:h-[80px]">
          <Image
            src="/icons/logo.png"
            loading="eager"
            fill={true}
            alt="logo"
            sizes="(max-width: 768px) 60px, 80px"
            priority={true}
          />
        </div>
        <span className="text-white text-[20px] md:text-[35px] font-[600]">
          {resolutionState ? "RIGBA" : `${mobileLogoTitle}`}
        </span>
      </Link>
    </div>
  );
}
