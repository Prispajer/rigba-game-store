import { ExtendedUser } from "@/auth";
import { UserWishlistState } from "../../redux/slices/userWishlist/userWishlist.types";
import { LocalStorageWishlistState } from "../../redux/slices/localStorageWishlist/localStorageWishlist.types";

export default function WishListCounter({
  user,
  localWishListState,
  userWishListState,
}: {
  user: ExtendedUser | null;
  localWishListState: LocalStorageWishlistState;
  userWishListState: UserWishlistState;
}) {
  const displayByRole = user
    ? userWishListState.products
    : localWishListState.localStorageWishlist;

  return (
    <div className="flex items-center w-full bg-[#2a5286]">
      <div className="flex justify-center items-center w-full md:w-auto py-[10px] px-[30px] gap-x-2 bg-secondaryColor cursor-default">
        <span className="font-medium text-white">Wishlist</span>
        <span className="font-normal text-[14px] text-white opacity-50">
          {displayByRole.length}
        </span>
      </div>
    </div>
  );
}
