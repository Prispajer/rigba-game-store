"use client";

import React from "react";
import Logo from "./Logo";
import Searchbar from "./SearchBar";
import Icons from "./Icons";
import HamburgerMenu from "@/components/Interface/Shared/Navbar/NavbarSidebar";

export default function Header() {
  const [isMediumScreenSize, setIsMediumScreenSize] =
    React.useState<boolean>(false);
  const [isOpened, setIsOpened] = React.useState<boolean>(isMediumScreenSize);

  const isProperWidth = () => {
    if (window.innerWidth > 768) {
      setIsMediumScreenSize(true);
    } else {
      setIsMediumScreenSize(false);
    }
  };

  console.log(isMediumScreenSize);

  React.useEffect(() => {
    window.addEventListener("resize", isProperWidth);
    isProperWidth();

    return () => {
      window.removeEventListener("resize", isProperWidth);
    };
  }, [isMediumScreenSize]);

  return (
    <header className="md:border-b-0  border-b-2 border-secondaryColor bg-primaryColor ">
      {!isMediumScreenSize && <HamburgerMenu />}
      <div className="flex items-center max-w-[1240px] w-full mx-auto md:py-2">
        <Logo />
        <Searchbar />
        <Icons isMediumScreenSize={isMediumScreenSize} />
      </div>
    </header>
  );
}
