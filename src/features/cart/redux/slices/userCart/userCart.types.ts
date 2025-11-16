import UserCart from "@/features/cart/types/userCart/userCart";

export interface UserCartState {
  products: UserCart["products"];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
}
