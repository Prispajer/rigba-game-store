import Link from "next/link";
import Image from "next/image";
import { FaRegHeart, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import AuthSidebar from "./AuthSidebar";
import CartModalContainer from "../CartModal/CartModalContainer";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserCart from "@/hooks/useUserCart";
import ProfileModalContainer from "../ProfileModal/ProfileModalContainer";
import { extendedNavItems } from "../ProfileModal/ProfileModalContainer";

export default function UserNavigation({}) {
  const { user } = useCurrentUser();
  const { userCartState } = useUserCart();
  const { resolutionState, handleOpen } = useWindowVisibility();
  const { localCartState } = useLocalStorage("LocalCart");
  const cartLength = user ? userCartState.products : localCartState;

  return (
    <div className="flex flex-1 justify-end items-center relative">
      <FaSearch
        onClick={() => handleOpen("searchBarModal")}
        className="nav-icon md:hidden"
      />
      <Link href="/wishlist">
        <FaRegHeart className="hidden ty:block nav-icon" />
      </Link>
      <div className="relative">
        <FaShoppingCart
          onClick={() => handleOpen("cartModal")}
          className="relative nav-icon"
        />
        <strong className="flex items-center justify-center absolute top-0 right-0 w-[20px] h-[20px] text-[12px] rounded-full bg-[#E0426E] text-[#FFFFFF] cursor-default">
          {cartLength.length}
        </strong>
        <AuthSidebar />
      </div>
      {resolutionState ? (
        <div className="flex items-center">
          {!user ? (
            <>
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
            </>
          ) : (
            <div className="relative w-[35px] h-[35px] py-[4px] ml-[10px] m-[6px] cursor-pointer">
              <Image
                onClick={() => handleOpen("profileModal")}
                src="/icons/logo.png"
                alt="avatar"
                layout="fill"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {!user ? (
            <FaUser
              onClick={() => handleOpen("authSidebar")}
              className="nav-icon"
            />
          ) : (
            <div className="relative w-[35px] h-[35px] py-[4px] ml-[10px] m-[6px] cursor-pointer">
              <Image
                onClick={() => handleOpen("profileModal")}
                src="/icons/logo.png"
                alt="avatar"
                layout="fill"
              />
            </div>
          )}
        </div>
      )}
      <ProfileModalContainer
        navItems={extendedNavItems}
        translateX="md:translate-x-[10px]"
        translateY="md:translate-y-[65px]"
      />
      <CartModalContainer />
    </div>
  );
}
