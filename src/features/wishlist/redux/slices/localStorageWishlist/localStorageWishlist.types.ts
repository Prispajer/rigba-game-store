import LocalStorageWishlistProduct from "@/features/wishlist/types/localStorageWishlistProduct";

export type LocalStorageWishlistState = {
  localStorageWishlist: LocalStorageWishlistProduct[];
  ordering: string | null;
};
