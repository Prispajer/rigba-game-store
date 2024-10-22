import IUtilsService from "../interfaces/IUtilsService";
import { GameAPIResponse } from "../utils/helpers/types";

export default class UtilsService implements IUtilsService {
  private searchText: string = "";

  constructor(searchText: string) {
    this.searchText = searchText;
  }

  getSearchText(): string {
    return this.searchText;
  }

  setSearchText(searchText: string): void {
    this.searchText = searchText;
  }

  searchByString(searchData: GameAPIResponse[]): GameAPIResponse[] {
    const searchText = this.getSearchText();
    if (!searchData) {
      return [];
    }
    return searchData.filter((game) =>
      game.name.toLowerCase().includes(searchText?.toLowerCase())
    );
  }
}
