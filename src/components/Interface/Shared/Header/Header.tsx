"use client";

import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Icons from "./Icons";
import HamburgerMenu from "@/components/Interface/Shared/Navbar/NavbarSidebar";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function Header() {
  const { isMediumScreenState, handleToggleScreen } = useWindowVisibility();

  React.useEffect(() => {
    window.addEventListener("resize", handleToggleScreen(768));
    return () => {
      window.removeEventListener("resize", handleToggleScreen(768));
    };
  }, [handleToggleScreen]);

  return (
    <header
      className={`md:border-b-0  border-b-2 z-[1] border-secondaryColor bg-primaryColor ${
        !isMediumScreenState ? "sticky top-0" : "flex"
      }`}
    >
      {!isMediumScreenState && <HamburgerMenu />}
      <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
        <Logo />
        <Searchbar />
        <Icons />
      </div>
    </header>
  );
}
