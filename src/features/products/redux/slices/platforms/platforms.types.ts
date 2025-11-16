import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export type PlatformsState = {
  platformsArray: ApiProductDetails[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
