"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleScreen } from "@/redux/slices/ui/uiSlice";
import HeaderLogo from "@/components/Interface/Header/HeaderLogo";
import HeaderUserNavigation from "@/components/Interface/Header//HeaderUserNavigation";
import NavbarSidebar from "@/components/Interface/Shared/Sidebars/NavbarSidebar";
import HeaderSearchBar from "@/components/Interface/Header/HeaderSearchBar";
import useWindowVisibility from "@/hooks/useWindowVisibility";

export default function AppHeader() {
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
