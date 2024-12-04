import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import AuthSidebar from "../Shared/Sidebars/AuthSidebar";
import CartModalContainer from "../Shared/Modals/CartModalContainer";
import { extendedNavItems } from "../Shared/Modals/ProfileModalContainer";
import ProfileModalContainer from "../Shared/Modals/ProfileModalContainer";
import useWindowVisibility from "@/hooks/useWindowVisibility";
import useLocalStorage from "@/hooks/useLocalStorage";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserCart from "@/hooks/useUserCart";
import useUserWishList from "@/hooks/useUserWishList";
import { fetchUserCart } from "@/redux/slices/userCartSlice";
import { fetchUserWishList } from "@/redux/slices/userWishListSlice";
import { AppDispatch } from "@/redux/store";

export default function HeaderUserNavigation({}) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCurrentUser();
  const { handleAddUserProductToWishList } = useUserWishList();
  const { userCartState, handleAddUserProductToCart } = useUserCart();
  const { resolutionState, handleOpen } = useWindowVisibility();
  const { localCartState, handleDeleteLocalProductFromCart } =
    useLocalStorage("localCart");
  const { localWishListState, handleDeleteLocalProductFromWishList } =
    useLocalStorage("localWishList");
  const cartLength = user ? userCartState.products : localCartState;

  React.useEffect(() => {
    if (user?.email) {
      dispatch(fetchUserWishList({ email: user.email }));
      dispatch(fetchUserCart({ email: user.email }));
    }
  }, []);

  React.useEffect(() => {
    if (localCartState.length > 0 && user) {
      localCartState.forEach((localCartProduct) => {
        handleAddUserProductToCart({
          email: user.email as string,
          externalProductId: localCartProduct.externalProductId,
          quantity: localCartProduct.quantity,
          name: localCartProduct.name,
          price: localCartProduct.price,
          background_image: localCartProduct.background_image,
          description: localCartProduct.description as string,
          rating: localCartProduct.rating as number,
          slug: localCartProduct.slug,
          released: localCartProduct.released as string,
          added: localCartProduct.added as number,
        });
        handleDeleteLocalProductFromCart(localCartProduct.externalProductId);
      });
    }
  }, [localCartState]);

  React.useEffect(() => {
    if (localWishListState.length > 0 && user) {
      localWishListState.forEach((localWishListProduct) => {
        handleAddUserProductToWishList({
          email: user.email as string,
          externalProductId: localWishListProduct.externalProductId,
          name: localWishListProduct.name,
          price: localWishListProduct.price,
          background_image: localWishListProduct.background_image,
          description: localWishListProduct.description as string,
          rating: localWishListProduct.rating as number,
          slug: localWishListProduct.slug as string,
          released: localWishListProduct.released as string,
          added: localWishListProduct.added as number,
        });
        handleDeleteLocalProductFromWishList(
          localWishListProduct.externalProductId
        );
      });
    }
  }, [localWishListState]);

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
                <Link href="/login" aria-label="Login" className="nav-link">
                  Zaloguj
                </Link>
              </div>
              <span className="text-white">|</span>
              <div className="cursor-pointer flex items-center hover:text-headerHover text-[white]">
                <Link
                  href="/register"
                  aria-label="Register"
                  className="nav-link"
                >
                  Zarejestruj
                </Link>
              </div>
            </>
          ) : (
            <div className="relative w-[35px] h-[35px] py-[4px] ml-[10px] m-[6px] rounded-full overflow-hidden cursor-pointer">
              <Image
                loading="lazy"
                onClick={() => handleOpen("profileModal")}
                src={user?.image ?? "/icons/logo.png"}
                alt={user?.image ?? "/icons/logo.png"}
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
            <div className="relative w-[35px] h-[35px] py-[4px] ml-[10px] m-[6px] rounded-full overflow-hidden cursor-pointer">
              <Image
                loading="lazy"
                onClick={() => handleOpen("profileModal")}
                src={user?.image ?? "/icons/logo.png"}
                alt={user?.image ?? "/icons/logo.png"}
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
