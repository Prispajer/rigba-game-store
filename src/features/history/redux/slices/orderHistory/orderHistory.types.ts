import { OrderHistory } from "@/types/types";

export interface OrderHistoryState {
  orderHistoryArray: OrderHistory[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
  isLoading: boolean;
}
