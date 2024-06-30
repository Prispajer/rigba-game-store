import { ProductSearchData } from "../helpers/types";

export default interface IUtilsService {
  getSearchText(): string;
  setSearchText(searchText: string): void;
  searchProducts(searchData: ProductSearchData[]): ProductSearchData[];
}
