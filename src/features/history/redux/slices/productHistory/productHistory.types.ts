import { ProductHistory } from "@/types/types";

export interface ProductHistoryState {
  productHistoryArray: ProductHistory[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
  isLoading: boolean;
}
