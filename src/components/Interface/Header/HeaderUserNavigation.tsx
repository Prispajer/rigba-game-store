import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import AuthSidebar from "../Shared/Sidebars/AuthSidebar";
import CartModalContainer from "../Shared/Modals/CartModalContainer";
import { extendedNavItems } from "../Shared/Modals/ProfileModalContainer";
import ProfileModalContainer from "../Shared/Modals/ProfileModalContainer";
import useUIVisibility from "@/hooks/useWindowVisibility";
import useUserCartActions from "@/features/cart/hooks/userCart/useUserCartActions";
import useUserWishlistActions from "@/features/wishlist/hooks/userWishlist/useUserWishlistActions";
import useUserCart from "@/features/cart/hooks/userCart/useUserCart";
import useLocalStorageCart from "@/features/cart/hooks/localStorageCart/useLocalStorageCart";
import useLocalStorageWishlist from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlist";
import useLocalStorageCartActions from "@/features/cart/hooks/localStorageCart/useLocalStorageCartActions";
import useLocalStorageWishlistActions from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlistActions";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import { getUserCartThunk } from "@/features/cart/redux/slices/userCart/userCart.thunk";
import { getUserWishlistThunk } from "@/features/wishlist/redux/slices/userWishlist/userWishlist.thunk";
import { AppDispatch } from "@/redux/store";
import mapProductToAddToCartDTO from "@/features/cart/mappers/mapProductToAddToCartDTO";
import mapProductToAddToWishlistDTO from "@/features/wishlist/mappers/mapProductToAddToWishlistDTO";

export default function HeaderUserNavigation({}) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useCurrentUser();
  const { userCartState } = useUserCart();
  const localStorageCartState = useLocalStorageCart("localStorageCart");
  const localStorageWishlistState = useLocalStorageWishlist(
    "localStorageWishlist"
  );
  const { handleAddUserProductToCart } = useUserCartActions();
  const { handleAddUserProductToWishlist } = useUserWishlistActions();
  const { handleDeleteLocalStorageProductFromCart } =
    useLocalStorageCartActions();
  const { handleDeleteLocalStorageProductFromWishList } =
    useLocalStorageWishlistActions();
  const { resolutionState, handleOpen } = useUIVisibility();

  const cartLength = user
    ? userCartState.products
    : localStorageCartState.localStorageCart;

  React.useEffect(() => {
    if (user?.email) {
      dispatch(getUserCartThunk({ email: user.email }));
      dispatch(getUserWishlistThunk({ email: user.email }));
    }
  }, []);

  React.useEffect(() => {
    if (localStorageCartState.localStorageCart.length > 0 && user) {
      localStorageCartState.localStorageCart.forEach((localCartProduct) => {
        handleAddUserProductToCart(
          mapProductToAddToCartDTO(localCartProduct, user.email)
        );
        handleDeleteLocalStorageProductFromCart(
          localCartProduct.externalProductId
        );
      });
    }
  }, [localStorageCartState.localStorageCart]);

  React.useEffect(() => {
    if (localStorageWishlistState.localStorageWishlist.length > 0 && user) {
      localStorageWishlistState.localStorageWishlist.forEach(
        (localWishListProduct) => {
          handleAddUserProductToWishlist(
            mapProductToAddToWishlistDTO(localWishListProduct, user.email)
          );
          handleDeleteLocalStorageProductFromWishList(
            localWishListProduct.externalProductId
          );
        }
      );
    }
  }, [localStorageWishlistState.localStorageWishlist]);

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
                  Login
                </Link>
              </div>
              <span className="text-white">|</span>
              <div className="cursor-pointer flex items-center hover:text-headerHover text-[white]">
                <Link
                  href="/register"
                  aria-label="Register"
                  className="nav-link"
                >
                  Register
                </Link>
              </div>
            </>
          ) : (
            <div className="relative min-w-[40px] min-h-[40px] ml-[10px] m-[6px] rounded-full overflow-hidden cursor-pointer">
              <Image
                loading="eager"
                onClick={() => handleOpen("profileModal")}
                fill={true}
                src={user?.image ?? "/icons/logo.png"}
                alt={user?.image ?? "/icons/logo.png"}
                className="min-w-[40px] min-h-[40px]"
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
            <div className="relative min-w-[40px] min-h-[40px] ml-[10px] m-[6px] rounded-full overflow-hidden cursor-pointer">
              <Image
                loading="eager"
                onClick={() => handleOpen("profileModal")}
                fill={true}
                src={user?.image ?? "/icons/logo.png"}
                alt={user?.image ?? "/icons/logo.png"}
                className="min-w-[40px] min-h-[40px]"
              />
            </div>
          )}
        </div>
      )}
      <ProfileModalContainer
        navItems={extendedNavItems}
        translateX="md:translate-x-[7px]"
        translateY="md:translate-y-[65px]"
      />
      <CartModalContainer />
    </div>
  );
}
