import { GameAPIResponse } from "../helpers/types";
export default interface IFetchService {
  fetchData(url: string): Promise<any>;
  getGame(productId: string): Promise<GameAPIResponse>;
  getGames(page: number): Promise<GamesAPIResponse[]>;
  getGameByOrdering(ordering: string): Promise<GameAPIResponse[]>;
  getGameScreenshots(productId: string): Promise<GameAPIResponse[]>;
  getGameGenres(): Promise<GameAPIResponse[]>;
  getGameByGenres(productId: string): Promise<GameAPIResponse>;
  getGameTags(productId: number): Promise<GameAPIResponse>;
  getGamesByTags(quantity: number): Promise<GameAPIResponse[]>;
  getGamesByTagsId(tagId: string, page: number): Promise<GameAPIResponse>;
  getGameRequirements(productId: string): Promise<GameAPIResponse>;
}
