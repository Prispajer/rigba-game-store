import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import ProfileSidebar from "./ProfileSidebar";
import CartModalContainer from "../CartModal/CartModalContainer";
import MobileSearchModal from "./MobileSearchModal";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserCart from "@/hooks/useUserCart";

export default function UserNavigation({}) {
  const user = useCurrentUser();
  const userCart = useUserCart();
  const { resolutionState, handleOpen } = useWindowVisibility();
  const { localCartState } = useLocalStorage("LocalCart");
  const cartLength = user ? userCart : localCartState;

  return (
    <div className="flex flex-1 justify-end items-center relative">
      <ProfileSidebar />
      <MobileSearchModal />
      <FaSearch
        onClick={() => handleOpen("mobileSearchModal")}
        className="nav-icon md:hidden"
        size="35px"
      />
      <Link href="/wishlist">
        <FaRegHeart className="hidden ty:block  nav-icon" size="35px" />
      </Link>
      <div className="relative">
        <FaShoppingCart
          onClick={() => handleOpen("cartModal")}
          className="relative nav-icon"
          size="35px"
        />
        <strong className="flex items-center justify-center absolute top-0 right-0 w-[20px] h-[20px] text-[12px] rounded-full bg-[#E0426E] text-[#FFFFFF] cursor-default">
          {cartLength.length}
        </strong>
      </div>
      {resolutionState ? (
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
