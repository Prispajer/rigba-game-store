import { Wishlist } from "@/types/types";

export interface WishlistState {
  products: Wishlist["products"];
  status: string;
  error: string | null;
  success: string | null;
  ordering: string | null;
  message: string | null;
  isLoading: boolean;
}
