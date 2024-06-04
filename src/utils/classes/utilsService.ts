import { UtilsInterface } from "../interfaces/utilsInterface";

export class UtilsService implements UtilsInterface {
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
}
