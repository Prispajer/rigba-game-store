import { UserOrderHistory } from "@/types/types";

export interface UserOrderHistoryState {
  orderHistoryArray: UserOrderHistory[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
  isLoading: boolean;
}
