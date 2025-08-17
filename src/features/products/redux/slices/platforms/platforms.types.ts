import { GameAPIResponse } from "@/types/types";

export type PlatformsState = {
  platformsArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
