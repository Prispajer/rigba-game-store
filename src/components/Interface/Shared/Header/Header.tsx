"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Modal from "../ShoppingCart/Modal";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isMedium, setIsMedium] = React.useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const isProperWidth = () => {
    if (window.innerWidth > 768) {
      setIsMedium(true);
    } else {
      setIsMedium(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", isProperWidth);

    () => {
      window.removeEventListener("resize", isProperWidth);
    };
  }, []);

  return (
    <header className="bg-primaryColor">
      <div className="flex items-center max-w-[1240px] w-full mx-auto py-2">
        <div className="flex items-center flex-0">
          <RxHamburgerMenu
            size="30px"
            className={
              isMedium ? "hidden" : "mx-[10px] text-[#ffffff] cursor-pointer"
            }
          />
          <Link className="flex items-center mr-[20px]" href={"/"}>
            <Image
              src="/icons/logo.png"
              width={isMedium ? "90" : "60"}
              height={90}
              alt="logo"
              priority={true}
            />
            <span className="text-white text-[30px] md:text-[40px]">RIGBA</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center  flex-1 p-[20px] border-[white] border-[2px] bg-transparent">
          <FaSearch size="25px" color="white" className="mr-3" />
          <input
            className="text-[white] border-none outline-none bg-transparent w-[100%]"
            type="text"
            name="text"
            placeholder="Szukaj"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-1 justify-end items-center">
          <FaSearch className={isMedium ? "hidden" : "nav-icon"} size="40px" />
          <Link href="/wishlist">
            <FaRegHeart className="nav-icon" size="40px" />
          </Link>
          <FaShoppingCart
            onClick={openModal}
            className="nav-icon"
            size="40px"
          />
          <Modal closeModal={closeModal} isOpen={isOpen} />
          {isMedium ? (
            <div className="flex items-center">
              <div className="cursor-pointer flex items-center hover:text-headerHover text-[white]">
                <Link href="/login" className="nav-link">
                  Zaloguj
                </Link>
              </div>
              <span className="text-white">|</span>
              <div className="cursor-pointer flex items-center hover:text-headerHover text-[white]">
                <Link href="/register" className="nav-link">
                  Zarejestruj
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <FaUser className="nav-icon" size="40px" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
