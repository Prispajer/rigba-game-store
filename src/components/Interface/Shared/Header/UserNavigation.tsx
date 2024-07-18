import Link from "next/link";
import Image from "next/image";
import { FaRegHeart, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import ProfileSidebar from "./ProfileSidebar";
import CartModalContainer from "../CartModal/CartModalContainer";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserCart from "@/hooks/useUserCart";
import { IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { LuGamepad2 } from "react-icons/lu";
import { TbShoppingCartCopy } from "react-icons/tb";
import { IoReload } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { signOutAccount } from "@/utils/actions";

export default function UserNavigation({}) {
  const handleLogout = () => {
    signOutAccount();
  };

  const user = useCurrentUser();
  const userCart = useUserCart();
  const { resolutionState, handleOpen } = useWindowVisibility();
  const { localCartState } = useLocalStorage("LocalCart");
  const cartLength = user ? userCart : localCartState;

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
        <ProfileSidebar />
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
            <div className="relative w-[40px] h-[40px] py-1 m-[6px] cursor-pointer">
              <Image src="/icons/logo.png" layout="fill" alt="avatar" />
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {!user ? (
            <FaUser
              onClick={() => handleOpen("userSidebar")}
              className="nav-icon"
            />
          ) : (
            <div className="relative w-[35px] h-[35px] py-1 m-[6px] cursor-pointer">
              <Image src="/icons/logo.png" alt="avatar" layout="fill" />
            </div>
          )}
        </div>
      )}
      <div className="absolute top-12 right-12 w-[290px] bg-primaryColor">
        <div className="profile-modal">
          <div className="flex md:hidden  items-center py-[10px] relative px-[20px]">
            <div className="flex items-center flex-0">
              <Link className="flex items-center max-w-[200px]" href="/">
                <Image
                  src="/icons/logo.png"
                  width={40}
                  height={40}
                  alt="logo"
                />
                <span className="text-[20px] text-black">RIGBA</span>
              </Link>
            </div>
            <div className="flex items-center flex-1 justify-end">
              <button>
                <IoCloseSharp
                  onClick={() => handleClose("profileModal")}
                  size="26px"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between py-[15px] px-[20px] border-b-[1px]">
            <div>
              <Image
                src="/icons/logo.png"
                width={32}
                height={32}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col text-left flex-1 ml-2 leading-[18px]">
              <span className="text-[#544d60] text-[14px] font-[650]">
                {user?.name}
              </span>
              <span className="text-[#544d60] text-[14px]">{user?.email}</span>
            </div>
          </div>
          <div className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px]">
            <Link
              className="flex items-center  text-[15px] text-[#544D60]"
              href="/wishlist"
            >
              <CiHeart size="15px" className="mr-[8px]" />
              Ulubione
            </Link>
          </div>
          <div className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px]">
            <Link
              className="flex items-center text-[15px] text-[#544D60]"
              href="/account"
            >
              <IoPersonOutline size="15px" className="mr-[8px]" />
              Moje konto
            </Link>
          </div>
          <div className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px]">
            <Link
              className="flex items-center text-[15px] text-[#544D60]"
              href="/orders"
            >
              <TbShoppingCartCopy size="15px" className="mr-[8px]" />
              Zamówienia
            </Link>
          </div>
          <div className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px]">
            <Link
              className="flex items-center text-[15px] text-[#544D60]"
              href="/keys"
            >
              <LuGamepad2 size="15px" className="mr-[8px]" />
              Biblioteka kluczy
            </Link>
          </div>
          <div
            onClick={handleLogout}
            className="text-[#544D60] text-left border-b-[1px] px-[20px] py-[10px] cursor-pointer"
          >
            <div className="flex items-center text-[15px] text-[#544D60]">
              <CiLogout size="15px" className="mr-[8px]" />
              Wyloguj
            </div>
          </div>
        </div>
      </div>
      <CartModalContainer />
    </div>
  );
}
