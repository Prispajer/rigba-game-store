import { GameAPIResponse } from "@/types/types";

export type StoresState = {
  storesArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
