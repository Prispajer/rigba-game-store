import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export type FiltersState = {
  productsWithFilters: ApiProductDetails[];
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
