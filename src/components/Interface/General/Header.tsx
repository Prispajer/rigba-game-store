import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-[#296CA6]">
      <div className="flex items-center mx-auto max-w-[1240px] w-full py-2">
        <div className="flex-0">
          <Link className="flex items-center mr-[20px]" href={"/"}>
            <Image src="/icons/logo.png" width={90} height={90} alt="" />
            <span className="text-white text-[40px]">RIGBA</span>
            {/* KIRBA */}
          </Link>
        </div>
        <div className="flex items-center border-[white] border-[2px] bg-transparent flex-1 p-[20px]">
          <FaSearch size={"25px"} color={"white"} className="mr-3" />
          <input
            className="color-[white] border-none outline-none bg-transparent w-[100%]"
            type="text"
            name="text"
            placeholder="Szukaj"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-1 justify-end items-center">
          <FaRegHeart className="nav-icon" size={"40px"}></FaRegHeart>
          <FaShoppingCart className="nav-icon" size={"40px"}></FaShoppingCart>
          <div className="cursor-pointer flex items-center hover:text-[#BF6597] text-[white]">
            <a className="nav-link" href="/">
              Zaloguj
            </a>
          </div>

          <span className="text-white">|</span>
          <div className="cursor-pointer flex items-center hover:text-[#BF6597] text-[white]">
            <a className="nav-link" href="/">
              Zarejestruj
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
