import UserWishlist from "@/features/wishlist/types/userWishlist/userWishlist";

export interface UserWishlistState {
  products: UserWishlist["products"];
  status: string;
  error: string | null;
  success: string | null;
  ordering: string | null;
  message: string | null;
  isLoading: boolean;
}
