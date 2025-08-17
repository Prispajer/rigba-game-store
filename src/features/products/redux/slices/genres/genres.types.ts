import { GameAPIResponse } from "@/types/types";

export type GenresState = {
  genresArray: GameAPIResponse[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
