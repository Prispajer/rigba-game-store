import IUtilsService from "../interfaces/iUtilsService";
import { ProductSearchData } from "../helpers/types";
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

  searchProducts(searchData: ProductSearchData[]): ProductSearchData[] {
    const searchText = this.getSearchText();
    if (!searchData || !searchText) return [];
    return searchData.filter((game) =>
      game.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
