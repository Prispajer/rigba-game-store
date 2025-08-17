import { GameAPIResponse } from "@/types/types";

export type PublishersState = {
  publishersArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
