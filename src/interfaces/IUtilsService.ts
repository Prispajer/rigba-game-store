import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

export default interface IUtilsService {
  getSearchText(): string;
  setSearchText(searchText: string): void;
  searchByString(searchData: ApiProductDetails[]): ApiProductDetails[];
}
