"use client";
import React from "react";
import Profile from "./WishListProfile";
import WishListCounter from "./WishListCounter";
import SearchBar from "./WishListSearchBar";
import SortBy from "../Shared/ReusableComponents/SortBy";
import WishListProductList from "./WishListProductList";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserWishList from "@/hooks/useUserWishList";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function WishListContainer() {
  const { user } = useCurrentUser();
  const { localWishListState, handleSetLocalOrdering } =
    useLocalStorage("localWishList");
  const { userWishListState, handleSetUserWishListOrdering } =
    useUserWishList();

  return (
    <section className="flex items-start justify-center w-full min-h-[calc(100vh-62px)] md:min-h-[calc(100vh-156px)] bg-primaryColor">
      <div className="flex flex-col items-center w-full max-w-[1240px]  mx-auto mt-[40px] mb-[100px] px-[20px]">
        {user && <Profile />}
        <WishListCounter />
        <div className="w-full mt-[40px] md:grid grid-cols-[220px,calc(100%-220px)]">
          <aside className="max-h-[120px] bg-[#5389b7] text-white">
            <SearchBar />
          </aside>
          <div className="flex flex-col w-full py-[15px] md:px-[15px] md:py-[0px] text-white">
            {user ? (
              <SortBy
                handleSortChange={handleSetUserWishListOrdering}
                sortedGamesCount={userWishListState.products.length}
                position="relative"
                display="flex-1"
              />
            ) : (
              <SortBy
                handleSortChange={handleSetLocalOrdering}
                sortedGamesCount={localWishListState.length}
                position="relative"
                display="flex-1"
              />
            )}
            <WishListProductList />
          </div>
        </div>
      </div>
    </section>
  );
}
