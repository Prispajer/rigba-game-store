import { LocalCart, LocalWishlist } from "@/types/types";

export type LocalStorageState = {
  localCart: LocalCart[];
  localWishList: LocalWishlist[];
  ordering: string | null;
};
