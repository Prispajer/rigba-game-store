import PurchasedProductRecord from "@/features/history/types/purchasedProductRecord";

export interface UserProductHistoryState {
  productHistoryArray: PurchasedProductRecord[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
  isLoading: boolean;
}
