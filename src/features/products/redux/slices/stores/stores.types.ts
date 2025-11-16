import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export type StoresState = {
  storesArray: ApiProductDetails[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
