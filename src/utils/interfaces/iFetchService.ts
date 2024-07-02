import { GameAPIResponse } from "../helpers/types";
export default interface IFetchService {
  fetchData(url: string): Promise<any>;
  getGames(page: number): Promise<GamesAPIResponse[]>;
  getProduct(productId: string): Promise<GameAPIResponse>;
  getProductByOrdering(ordering: string): Promise<GameAPIResponse[]>;
  getGameScreenshots(productId: string): Promise<GameAPIResponse[]>;
  getGameGenres(): Promise<GameAPIResponse[]>;
  getGameTags(productId: string): Promise<GameAPIResponse>;
  getGamesByTags(quantity: number): Promise<GameAPIResponse[]>;
  getGameRequirements(productId: string): Promise<GameAPIResponse>;
}
