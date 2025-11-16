import OrderHistoryRecord from "@/features/history/types/orderHistoryRecord";

export interface UserOrderHistoryState {
  orderHistoryArray: OrderHistoryRecord[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
  isLoading: boolean;
}
