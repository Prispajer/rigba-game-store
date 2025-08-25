import { UserProductHistory } from "@/types/types";

export interface UserProductHistoryState {
  productHistoryArray: UserProductHistory[];
  status: string;
  error: string | null;
  success: string | null;
  message: string | null;
  isLoading: boolean;
}
