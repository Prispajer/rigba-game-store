"use client";

import React from "react";
import CheckoutLogo from "./CheckoutLogo";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function CheckoutHeader() {
  const { isMediumScreenState, handleToggleScreen } = useWindowVisibility();
  return (
    <header
      className={`z-[1] border-secondaryColor bg-primaryColor ${
        !isMediumScreenState ? "sticky top-0" : "flex"
      }`}
    >
      <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
        <CheckoutLogo />
      </div>
    </header>
  );
}
