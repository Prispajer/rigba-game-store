import { ExtendedUser } from "@/auth";
import { UserWishListState } from "@/features/wishlist/redux/slices/userWishlist/userWishlistSlice";
import { LocalStorageState } from "@/redux/slices/localStorage/localStorageSlice";

export default function WishListCounter({
  user,
  localWishListState,
  userWishListState,
}: {
  user: ExtendedUser | null;
  localWishListState: LocalStorageState["localWishList"];
  userWishListState: UserWishListState;
}) {
  const displayByRole = user ? userWishListState.products : localWishListState;

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
