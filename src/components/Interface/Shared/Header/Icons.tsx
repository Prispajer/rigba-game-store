import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Modal from "../ShoppingCart/Modal";

export default function Icons({
  isMediumScreenSize,
  isOpen,
  openModal,
  closeModal,
}) {
  return (
    <div className="flex flex-1 justify-end items-center">
      <FaSearch
        className={isMediumScreenSize ? "hidden" : "nav-icon"}
        size="35px"
      />
      <Link href="/wishlist">
        <FaRegHeart className="hidden ty:block  nav-icon" size="35px" />
      </Link>
      <FaShoppingCart onClick={openModal} className="nav-icon" size="35px" />
      <Modal closeModal={closeModal} isOpen={isOpen} />
      {isMediumScreenSize ? (
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
          <FaUser className="nav-icon" size="35px" />
        </div>
      )}
    </div>
  );
}
