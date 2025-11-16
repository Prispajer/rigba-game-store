import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export type GenresState = {
  genresArray: ApiProductDetails[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
