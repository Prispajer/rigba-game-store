import { IUtilsService } from "../interfaces/iUtilsService";
import { GameSearchData } from "../helpers/types";

export class UtilsService implements IUtilsService {
  private _searchText: string;

  constructor(searchText: string) {
    this._searchText = searchText;
  }

  getSearchText(): string {
    return this._searchText;
  }

  setSearchText(searchText: string): void {
    this._searchText = searchText;
  }

  searchProducts(searchData: GameSearchData[]): GameSearchData[] {
    const searchText = this.getSearchText();
    if (!searchData || !searchText) return [];
    return searchData.filter((game) =>
      game.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
