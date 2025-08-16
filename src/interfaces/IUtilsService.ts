import { GameAPIResponse } from "@/types/types";

export default interface IUtilsService {
  getSearchText(): string;
  setSearchText(searchText: string): void;
  searchByString(searchData: GameAPIResponse[]): GameAPIResponse[];
}
