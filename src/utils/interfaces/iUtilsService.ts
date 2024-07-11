import { SearchData } from "../helpers/types";

export default interface IUtilsService {
  getSearchText(): string;
  setSearchText(searchText: string): void;
  searchByString(searchData: SearchData[]): SearchData[];
}
