import { ProductInformations } from "@/utils/helpers/types";

export default interface IUtilsService {
  getSearchText(): string;
  setSearchText(searchText: string): void;
  searchByString(searchData: GameAPIResponse[]): GameAPIResponse[];
}
