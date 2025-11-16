import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import AuthSidebar from "../Shared/Sidebars/AuthSidebar";
import CartModalContainer from "../Shared/Modals/CartModalContainer";
import { extendedNavItems } from "../Shared/Modals/ProfileModalContainer";
import ProfileModalContainer from "../Shared/Modals/ProfileModalContainer";
import useUIVisibility from "@/hooks/useUiVisibility";
import useUserCart from "@/features/cart/hooks/userCart/useUserCart";
import useUserWishlist from "@/features/wishlist/hooks/userWishlist/useUserWishlist";
import useLocalStorageCart from "@/features/cart/hooks/localStorageCart/useLocalStorageCart";
import useLocalStorageWishlist from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlist";
import useLocalStorageCartActions from "@/features/cart/hooks/localStorageCart/useLocalStorageCartActions";
import useLocalStorageWishlistActions from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlistActions";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import mapLocalCartItemToUserCartItemDTO from "@/features/cart/mappers/mapLocalCartItemToUserCartItemDTO";
import mapLocalWishlistItemToUserWishlistItemDTO from "@/features/wishlist/mappers/mapLocalWishlistItemToUserWishlistItemDTO";
import type { AppDispatch } from "@/redux/store";
import { addUserProductToCartThunk } from "@/features/cart/redux/slices/userCart/userCart.thunk";
import { addUserProductToWishlistThunk } from "@/features/wishlist/redux/slices/userWishlist/userWishlist.thunk";

export default function HeaderUserNavigation() {
    const { user } = useCurrentUser();
    const { userCartState, getUserCart } = useUserCart();
    const { getUserWishlist } = useUserWishlist();
    const { localStorageCartState } = useLocalStorageCart("localStorageCart");
    const { localStorageWishlistState } = useLocalStorageWishlist("localStorageWishlist")
    const { handleDeleteLocalStorageProductFromCart } = useLocalStorageCartActions();
    const { handleDeleteLocalStorageProductFromWishlist } = useLocalStorageWishlistActions();
    const { resolutionState, handleShowElement } = useUIVisibility();
    const dispatch = useDispatch<AppDispatch>();

    const cartProducts = user ? userCartState.products : localStorageCartState.localStorageCart;

    const syncCart = React.useCallback(async () => {
        if (localStorageCartState.localStorageCart.length > 0 && user?.email) {
            await Promise.all(localStorageCartState.localStorageCart.map(async (localCartItem) => {
                await dispatch(addUserProductToCartThunk(mapLocalCartItemToUserCartItemDTO(localCartItem, user.email)));
            }));
            localStorageCartState.localStorageCart.forEach((localCartProduct) => {
                handleDeleteLocalStorageProductFromCart(localCartProduct.externalProductId);
            })
            await getUserCart();
        }
    }, [user?.email, localStorageCartState.localStorageCart.length]);

    const syncWishlist = React.useCallback(async () => {
        if (localStorageWishlistState.localStorageWishlist.length > 0 && user?.email) {
            await Promise.all(localStorageWishlistState.localStorageWishlist.map(async (localWishlistProduct) => {
                await dispatch(addUserProductToWishlistThunk(mapLocalWishlistItemToUserWishlistItemDTO(localWishlistProduct, user.email)));
            }))
            localStorageWishlistState.localStorageWishlist.forEach((localWishlistProduct) => {
                handleDeleteLocalStorageProductFromWishlist(localWishlistProduct.externalProductId);
            });
            await getUserWishlist();
        }
    }, [user?.email, localStorageWishlistState.localStorageWishlist.length]);

    React.useEffect(() => {
        (async () => {
            await syncCart();
        })();
    }, [syncCart]);

    React.useEffect(() => {
        (async () => {
            await syncWishlist();
        })();
    }, [syncWishlist]);

    React.useEffect(() => {
        if (user?.email) {
            (async () => {
                await getUserCart();
                await getUserWishlist();
            })();
        }
    }, [user?.email, getUserCart, getUserWishlist]);

    return (
        <div className="flex flex-1 justify-end items-center relative">
            <FaSearch onClick={() => handleShowElement("searchBarModal")} className="nav-icon md:hidden" />
            <Link href="/wishlist">
                <FaRegHeart className="hidden ty:block nav-icon" />
            </Link>
            <div className="relative">
                <FaShoppingCart onClick={() => handleShowElement("cartModal")} className="relative nav-icon" />
                <strong className="flex items-center justify-center absolute top-0 right-0 w-[20px] h-[20px] text-[12px] rounded-full bg-[#E0426E] text-[#FFFFFF] cursor-default">
                    {cartProducts.length}
                </strong>
                <AuthSidebar />
            </div>
            {resolutionState ? (
                <div className="flex items-center">
                    {!user ? (
                        <>
                            <Link href="/login" aria-label="Login" className="nav-link hover:text-headerHover text-white">
                                Login
                            </Link>
                            <span className="text-white mx-2">|</span>
                            <Link href="/register" aria-label="Register" className="nav-link hover:text-headerHover text-white">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="relative min-w-[40px] min-h-[40px] ml-[10px] m-[6px] rounded-full overflow-hidden cursor-pointer">
                            <Image
                                loading="eager"
                                onClick={() => handleShowElement("profileModal")}
                                fill
                                src={user?.image ?? "/icons/logo.png"}
                                alt="User profile"
                                className="min-w-[40px] min-h-[40px]"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative">
                    {!user ? (
                        <FaUser onClick={() => handleShowElement("authSidebar")} className="nav-icon" />
                    ) : (
                        <div className="relative min-w-[40px] min-h-[40px] ml-[10px] m-[6px] rounded-full overflow-hidden cursor-pointer">
                            <Image
                                loading="eager"
                                onClick={() => handleShowElement("profileModal")}
                                fill
                                src={user?.image ?? "/icons/logo.png"}
                                alt="User profile"
                                className="min-w-[40px] min-h-[40px]"
                            />
                        </div>
                    )}
                </div>
            )}
            <ProfileModalContainer navItems={extendedNavItems} translateX="md:translate-x-[7px]" translateY="md:translate-y-[65px]" />
            <CartModalContainer />
        </div>
    );
}