import { Cart } from "@/types/types";

export interface CartState {
  products: Cart["products"];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
}
