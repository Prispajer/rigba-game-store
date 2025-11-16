import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export type PublishersState = {
  publishersArray: ApiProductDetails[];
  isLoading: boolean;
  error: string | null;
  page_size: number;
};
