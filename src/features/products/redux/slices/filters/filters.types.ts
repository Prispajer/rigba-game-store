import { GameAPIResponse } from "@/types/types";

export type FiltersState = {
  productsWithFilters: GameAPIResponse[];
  genresIdArray: number[];
  platformsIdArray: number[];
  storesIdArray: number[];
  publishersIdArray: number[];
  ordering: string;
  isLoading: boolean;
  error: string | null;
  page: number;
  gamesCount: number;
  nextPage: string | null;
  previousPage: string | null;
};
