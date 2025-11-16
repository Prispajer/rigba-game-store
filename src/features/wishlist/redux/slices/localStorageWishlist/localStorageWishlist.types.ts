import LocalStorageWishlistItem from "@/features/wishlist/types/localStorageWishlist/localStorageWishlistItem";

export type LocalStorageWishlistState = {
  localStorageWishlist: LocalStorageWishlistItem[];
  ordering: string | null;
};
