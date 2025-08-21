import { UserCart } from "@/types/types";

export interface UserCartState {
  products: UserCart["products"];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
}
