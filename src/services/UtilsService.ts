import IUtilsService from "../interfaces/IUtilsService";
import ApiProductDetails from "@/features/products/types/api/apiProductDetails";

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

  searchByString(searchData: ApiProductDetails[]): ApiProductDetails[] {
    const searchText = this.getSearchText();
    if (!searchData) {
      return [];
    }
    return searchData.filter((game) =>
      game.name.toLowerCase().includes(searchText?.toLowerCase())
    );
  }
}
