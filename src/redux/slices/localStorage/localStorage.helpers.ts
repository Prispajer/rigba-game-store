import { LocalStorageState } from "./localStorage.types";
import { LocalWishlist } from "@/types/types";

export const sortWishList = (
  wishlist: LocalStorageState["localWishList"],
  ordering: string | null
): LocalWishlist[] => {
  switch (ordering) {
    case "price":
      return [...wishlist].sort((a, b) => (a.price || 0) - (b.price || 0));
    case "-price":
      return [...wishlist].sort((a, b) => (b.price || 0) - (a.price || 0));
    case "released":
      return [...wishlist].sort(
        (a, b) =>
          new Date(a.released || "").getTime() -
          new Date(b.released || "").getTime()
      );
    case "-released":
      return [...wishlist].sort(
        (a, b) =>
          new Date(b.released || "").getTime() -
          new Date(a.released || "").getTime()
      );
    case "added":
      return [...wishlist].sort((a, b) => (a.added || 0) - (b.added || 0));
    case "-added":
      return [...wishlist].sort((a, b) => (b.added || 0) - (a.added || 0));
    case "name":
      return [...wishlist].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    case "-name":
      return [...wishlist].sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    default:
      return [...wishlist].sort((a, b) => (a.price || 0) - (b.price || 0));
  }
};
