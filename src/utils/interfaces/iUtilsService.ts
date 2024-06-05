import { GameSearchData } from "../helpers/types";

export interface IUtilsService {
  getSearchText(): string;
  setSearchText(searchText: string): void;
  searchProducts(searchData: GameSearchData[]): GameSearchData[];
}
