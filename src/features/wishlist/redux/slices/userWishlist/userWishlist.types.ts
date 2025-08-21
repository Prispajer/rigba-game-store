import { UserWishlist } from "@/types/types";

export interface UserWishlistState {
  products: UserWishlist["products"];
  status: string;
  error: string | null;
  success: string | null;
  ordering: string | null;
  message: string | null;
  isLoading: boolean;
}
