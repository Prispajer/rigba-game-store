import { SearchData } from "../helpers/types";
import IUtilsService from "../interfaces/iUtilsService";

export default class UtilsService implements IUtilsService {
  private searchText: string;

  constructor(searchText: string) {
    this.searchText = searchText;
  }

  getSearchText(): string {
    return this.searchText;
  }

  setSearchText(searchText: string): void {
    this.searchText = searchText;
  }

  searchByString(searchData: SearchData[]): SearchData[] {
    const searchText = this.getSearchText();
    return searchData.filter((game) =>
      game.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
