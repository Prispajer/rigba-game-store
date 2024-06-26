import { IUtilsService } from "../interfaces/iUtilsService";
import { GameSearchData } from "../helpers/types";

export class UtilsService implements IUtilsService {
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

  searchProducts(searchData: GameSearchData[]): GameSearchData[] {
    const searchText = this.getSearchText();
    if (!searchData || !searchText) return [];
    return searchData.filter((game) =>
      game.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
