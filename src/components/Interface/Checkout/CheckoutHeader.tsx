"use client";

import React from "react";
import CheckoutLogo from "./CheckoutLogo";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function CheckoutHeader() {
  const { resolutionState, handleToggleScreen } = useWindowVisibility();

  React.useEffect(() => {
    window.addEventListener("resize", handleToggleScreen(768));
    return () => {
      window.removeEventListener("resize", handleToggleScreen(768));
    };
  }, []);

  return (
    <header
      className={`px-[8px] z-[1] border-secondaryColor bg-primaryColor md:bg-secondaryColor ${
        !resolutionState ? "sticky top-0" : "flex"
      }`}
    >
      <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
        <CheckoutLogo />
      </div>
    </header>
  );
}
