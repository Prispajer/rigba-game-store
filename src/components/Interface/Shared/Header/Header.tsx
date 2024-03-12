"use client";

import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Icons from "./Icons";
import Sidebar from "../Navbar/Sidebar";

export default function Header() {
  const [isMediumScreenSize, setIsMediumScreenSize] =
    React.useState<boolean>(false);

  const isProperWidth = () => {
    if (window.innerWidth > 768) {
      setIsMediumScreenSize(true);
    } else {
      setIsMediumScreenSize(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", isProperWidth);

    isProperWidth();
    () => {
      window.removeEventListener("resize", isProperWidth);
    };
  }, []);

  return (
    <header className="md:border-b-0  border-b-2 border-secondaryColor bg-primaryColor ">
      <Sidebar />
      <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
        <Logo isMediumScreenSize={isMediumScreenSize} />
        <SearchBar />
        <Icons isMediumScreenSize={isMediumScreenSize} />
      </div>
    </header>
  );
}
