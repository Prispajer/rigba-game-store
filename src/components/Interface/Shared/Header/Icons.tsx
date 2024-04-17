import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import ProfileWindow from "./ProfileWindow";
import SearchWindow from "./SearchWindow";
import CartModalContainer from "../CartModal/CartModalContainer";

export default function Icons({
  isMediumScreenSize,
}: {
  isMediumScreenSize: boolean;
}) {
  const { handleOpen } = useWindowVisibility();
  return (
    <div className="flex flex-1 justify-end items-center relative">
      <ProfileWindow />
      <SearchWindow />
      <FaSearch
        onClick={() => handleOpen("searchSidebar")}
        className="nav-icon md:hidden"
        size="35px"
      />
      <Link href="/wishlist">
        <FaRegHeart className="hidden ty:block  nav-icon" size="35px" />
      </Link>
      <FaShoppingCart
        onClick={() => handleOpen("cartModal")}
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
            onClick={() => handleOpen("userSidebar")}
            className="nav-icon"
            size="35px"
          />
        </div>
      )}
      <CartModalContainer />
    </div>
  );
}
