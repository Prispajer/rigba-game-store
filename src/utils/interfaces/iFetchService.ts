import { GamesAPIResponse, GameAPIResponse } from "../helpers/types";
export default interface IFetchService {
  fetchData(url: string): Promise<any>;
  getGames(): Promise<GamesAPIResponse>;
  getProduct(productId: string): Promise<GameAPIResponse>;
  getProductByOrdering(ordering: string): Promise<GamesAPIResponse>;
  getGameScreenshots(productId: string): Promise<GamesAPIResponse>;
  getGameGenres(): Promise<GamesAPIResponse>;
  getGameTags(productId: string): Promise<GameAPIResponse>;
  getGamesByTags(quantity: number): Promise<GamesAPIResponse>;
  getGameRequirements(productId: string): Promise<GameAPIResponse>;
}
