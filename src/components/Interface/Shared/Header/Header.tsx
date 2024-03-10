"use client";

import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Icons from "./Icons";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isMediumScreenSize, setIsMediumScreenSize] =
    React.useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
    <header className="bg-primaryColor">
      <div className="flex items-center max-w-[1240px] w-full mx-auto py-2">
        <Logo isMediumScreenSize={isMediumScreenSize} />
        <SearchBar />
        <Icons
          isMediumScreenSize={isMediumScreenSize}
          isOpen={isOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
    </header>
  );
}
