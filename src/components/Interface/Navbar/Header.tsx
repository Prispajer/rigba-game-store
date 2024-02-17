"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Modal from "./Modal/Modal";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-[#296CA6]">
      <div className="flex items-center max-w-[1240px] w-full mx-auto py-2">
        <div className="flex-0">
          <Link className="flex items-center mr-[20px]" href={"/"}>
            <Image
              src="/icons/logo.png"
              width={90}
              height={90}
              alt="logo"
              priority={true}
            />
            <span className="text-white text-[40px]">RIGBA</span>
          </Link>
        </div>
        <div className="flex items-center  flex-1 p-[20px] border-[white] border-[2px] bg-transparent">
          <FaSearch size={"25px"} color={"white"} className="mr-3" />
          <input
            className="text-[white] border-none outline-none bg-transparent w-[100%]"
            type="text"
            name="text"
            placeholder="Szukaj"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-1 justify-end items-center">
          <FaRegHeart className="nav-icon" size={"40px"}></FaRegHeart>
          <FaShoppingCart
            onClick={openModal}
            className="nav-icon"
            size={"40px"}
          ></FaShoppingCart>
          <Modal
            openModal={openModal}
            closeModal={closeModal}
            isOpen={isOpen}
          ></Modal>
          <div className="cursor-pointer flex items-center hover:text-[#BF6597] text-[white]">
            <Link href="/login" className="nav-link">
              Zaloguj
            </Link>
          </div>
          <span className="text-white">|</span>
          <div className="cursor-pointer flex items-center hover:text-[#BF6597] text-[white]">
            <Link href="/register" className="nav-link">
              Zarejestruj
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
