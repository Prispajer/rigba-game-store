"use client";
import React from "react";
import Profile from "./Profile";
import WishListCounter from "./WishListCounter";
import SearchBar from "./SearchBar";
import SortBy from "../Shared/SortBy/SortBy";
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
    <main className="flex items-center justify-center w-full bg-primaryColor">
      <section className="flex flex-col items-center w-full max-w-[1240px] min-h-[calc(100vh-500px)] mx-auto mt-[40px] mb-[100px] px-4 md:px-2">
        {user && <Profile />}
        <WishListCounter />
        <div className="w-full mt-[40px] md:grid grid-cols-[220px,calc(100%-220px)]">
          <aside className="max-h-[120px] bg-[#5389b7] text-white">
            <SearchBar />
          </aside>
          <div className="flex flex-col w-full px-[15px] text-white">
            {user ? (
              <SortBy
                handleSortChange={handleSetUserWishListOrdering}
                sortArrayLength={userWishListState.products}
              />
            ) : (
              <SortBy
                handleSortChange={handleSetLocalOrdering}
                sortArrayLength={localWishListState}
              />
            )}
            <WishListProductList />
          </div>
        </div>
      </section>
    </main>
  );
}
