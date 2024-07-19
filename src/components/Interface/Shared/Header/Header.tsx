"use client";

import React from "react";
import Logo from "./Logo";
import UserNavigation from "./UserNavigation";
import HamburgerMenu from "@/components/Interface/Shared/Navbar/NavbarSidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleScreen } from "@/redux/slices/utilitySlice";
import SearchBar from "./SearchBar";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function Header() {
  const { resolutionState, handleToggleScreen } = useWindowVisibility();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const windowScreen = window.innerWidth >= 768;
    dispatch(toggleScreen(windowScreen));
    window.addEventListener("resize", handleToggleScreen(768));
    return () => {
      window.removeEventListener("resize", handleToggleScreen(768));
    };
  }, [handleToggleScreen, dispatch]);

  return (
    <header
      className={`md:border-b-0  border-b-2 z-[1] border-secondaryColor bg-primaryColor ${
        !resolutionState ? "sticky top-0" : "flex"
      }`}
    >
      {!resolutionState && <HamburgerMenu />}
      <div className="relative flex items-center max-w-[1240px] w-full mx-auto md:py-2">
        <Logo />
        <SearchBar />
        <UserNavigation />
      </div>
    </header>
  );
}
