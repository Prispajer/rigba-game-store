"use client";

import React from "react";
import WishlistProfile from "./WishlistProfile";
import WishlistCounter from "./WishlistCounter";
import WishlistSearchBar from "./WishlistSearchBar";
import SortBy from "../../../../components/Interface/Shared/ReusableComponents/SortBy";
import WishlistProductList from "./WishlistProductList";
import useCurrentUser from "@/features/user/hooks/useCurrentUser";
import useUserWishlist from "@/features/wishlist/hooks/userWishlist/useUserWishlist";
import useCustomRouter from "@/hooks/useCustomRouter";
import useSearchText from "@/hooks/useSearchText";
import useUserWishlistActions from "@/features/wishlist/hooks/userWishlist/useUserWishlistActions";
import useLocalStorageWishlist from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlist";
import useLocalStorageWishlistActions from "@/features/wishlist/hooks/localStorageWishlist/useLocalStorageWishlistActions";

export default function WishlistContainer() {
  const { user } = useCurrentUser();
  const { userWishlistState, getUserWishlist } = useUserWishlist();
  const { handleSetUserWishlistOrdering } =
    useUserWishlistActions(getUserWishlist);
  const localStorageWishlistState = useLocalStorageWishlist(
    "localStorageWishlist"
  );
  const { handleSetLocalStorageWishlistOrdering } =
    useLocalStorageWishlistActions();
  const {
    searchWishlistTextState,
    handleSetSearchText,
    handleClearSearchText,
  } = useSearchText();
  const { redirectToGame } = useCustomRouter();

  return (
    <section className="flex items-start justify-center w-full min-h-[calc(100vh-62px)] md:min-h-[calc(100vh-156px)] bg-primaryColor">
      <div className="flex flex-col items-center w-full max-w-[1240px] mx-auto mt-[40px] mb-[100px] px-[20px]">
        {user && <WishlistProfile user={user} />}
        <WishlistCounter
          user={user}
          localWishlistState={localStorageWishlistState}
          userWishlistState={userWishlistState}
        />
        <div className="w-full mt-[40px] md:grid grid-cols-[220px,calc(100%-220px)]">
          <aside className="max-h-[120px] bg-[#5389b7] text-white">
            <WishlistSearchBar
              handleSetSearchText={handleSetSearchText}
              handleClearSearchText={handleClearSearchText}
            />
          </aside>
          <div className="flex flex-col w-full py-[15px] md:px-[15px] md:py-[0px] text-white">
            {user ? (
              <SortBy
                handleSortChange={handleSetUserWishlistOrdering}
                sortedGamesCount={userWishlistState.products.length}
                position="relative"
                display="flex-1"
              />
            ) : (
              <SortBy
                handleSortChange={handleSetLocalStorageWishlistOrdering}
                sortedGamesCount={
                  localStorageWishlistState.localStorageWishlist.length
                }
                position="relative"
                display="flex-1"
              />
            )}
            <WishlistProductList
              user={user}
              localStorageWishlistState={localStorageWishlistState}
              userWishlistState={userWishlistState}
              redirectToGame={redirectToGame}
              searchWistListTextState={searchWishlistTextState as string}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
