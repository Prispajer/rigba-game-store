import { GameAPIResponse } from "../helpers/types";

export default interface IFetchService {
  fetchData(url: string): Promise<any>;
  getGame(productId: string): Promise<GameAPIResponse>;
  getGames(searchQuery?: string): Promise<GameAPIResponse[]>;
  getGameByOrdering(ordering: string): Promise<GameAPIResponse[]>;
  getGameScreenshots(productId: string): Promise<GameAPIResponse[]>;
  getGamesGenres(pageSize: number): Promise<GameAPIResponse[]>;
  getGamesPublishers(quantity: number): Promise<GameAPIResponse[]>;
  getGamesPlatforms(quantity: number): Promise<GameAPIResponse[]>;
  getGamesStores(quantity: number): Promise<GameAPIResponse[]>;
  getGamesWithFilters(
    genresId: number[],
    page: number,
    platformsId?: number[],
    storesId?: number[],
    publishersId?: number[]
  ): Promise<GameAPIResponse[]>;
  getGamesByTagsId(
    tagIds: number[],
    page: number,
    platformsId: number[]
  ): Promise<GameAPIResponse>;
  getGameRequirements(productId: string): Promise<GameAPIResponse>;
}
