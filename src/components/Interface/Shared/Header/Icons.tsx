import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import useSharedGeneralActions from "@/redux/actions/useSharedGeneralActions";
import ProfileSidebar from "./ProfileSidebar";
import SearchSidebar from "./SearchSidebar";
import MyCartContainer from "../ShoppingCart/MyCartContainer";

export default function Icons({ isMediumScreenSize }) {
  const { handleOpenSidebar } = useSharedGeneralActions();
  return (
    <div className="flex flex-1 justify-end items-center relative">
      <ProfileSidebar />
      <SearchSidebar />
      <FaSearch
        onClick={() => handleOpenSidebar("searchSidebar")}
        className={isMediumScreenSize ? "hidden" : "nav-icon"}
        size="35px"
      />
      <Link href="/wishlist">
        <FaRegHeart className="hidden ty:block  nav-icon" size="35px" />
      </Link>
      <FaShoppingCart
        onClick={() => handleOpenSidebar("myCart")}
        className="nav-icon"
        size="35px"
      />
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
          <FaUser
            onClick={() => handleOpenSidebar("userSidebar")}
            className="nav-icon"
            size="35px"
          />
        </div>
      )}
      <MyCartContainer />
    </div>
  );
}
