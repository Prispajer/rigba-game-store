"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleScreen } from "@/redux/slices/utilitySlice";
import HeaderLogo from "./HeaderLogo";
import HeaderUserNavigation from "./HeaderUserNavigation";
import NavbarSidebar from "../Shared/Sidebars/NavbarSidebar";
import HeaderSearchBar from "./HeaderSearchBar";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function HeaderContainer() {
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
      className={`md:border-b-0 border-b-2 border-secondaryColor bg-primaryColor z-[10] ${
        !resolutionState ? "sticky top-0" : "flex"
      }`}
    >
      {!resolutionState && <NavbarSidebar />}
      <div className="relative flex flex-wrap items-center max-w-[1240px] w-full mx-auto  md:py-2">
        <HeaderLogo />
        <HeaderSearchBar />
        <HeaderUserNavigation />
      </div>
    </header>
  );
}
