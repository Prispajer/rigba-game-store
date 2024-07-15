import IFetchService from "../interfaces/iFetchService";
import { GameAPIResponse } from "../helpers/types";

export class FetchService implements IFetchService {
  private apiKey: string = "29d3c3cc5a274ae79c69afde3809b498";
  private baseUrl: string = "https://api.rawg.io/api";

  async fetchData(url: string): Promise<any> {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("An error occurred while fetching data from API!", error);
      throw error;
    }
  }

  async getGame(productId: string): Promise<GameAPIResponse> {
    const url = `${this.baseUrl}/games/${productId}?key=${this.apiKey}`;
    return this.fetchData(url);
  }

  async getGames(searchQuery?: string): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games?key=${this.apiKey}${
      searchQuery ? `&search=${searchQuery}` : ""
    }`;
    const data = await this.fetchData(url);

    if (searchQuery && data.results) {
      return data.results;
    }

    return [];
  }

  async getGameByOrdering(ordering: string): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games?key=${this.apiKey}&ordering=${ordering}`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGameScreenshots(productId: string): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games/${productId}/screenshots?key=${this.apiKey}`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGamesGenres(quantity: number = 1): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/genres?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGamesPublishers(quantity: number = 1): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/publishers?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData(url);
    return data.results || [];
  }
  async getGamesPlatforms(quantity: number = 1): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/platforms?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGamesStores(quantity: number = 1): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/stores?key=${this.apiKey}&page_size=${
      7 * quantity
    }`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGamesWithFilters(
    genresId: number[],
    page: number,
    platformsId?: number[],
    storesId?: number[],
    publishersId?: number[]
  ): Promise<GameAPIResponse[]> {
    const genresQuery = genresId.join(",");
    const platformsQuery = platformsId?.join(",");
    const storesQuery = storesId?.join(",");
    const publishersQuery = publishersId?.join(",");
    const url = `${this.baseUrl}/games?key=${this.apiKey}&${
      genresQuery ? `&genres=${genresQuery}` : ""
    }&page=${page}${platformsQuery ? `&platforms=${platformsQuery}` : ""}${
      storesQuery ? `&stores=${storesQuery}` : ""
    }${publishersQuery ? `&publishers=${publishersQuery}` : ""}`;
    const data = await this.fetchData(url);
    return data || [];
  }

  async getGamesByTags(
    size: number,
    quantity: number
  ): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/tags?page_size=${size * quantity}&key=${
      this.apiKey
    }`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGamesByTagsId(
    tagsId: number[],
    page: number,
    platformsId: number[]
  ): Promise<GameAPIResponse> {
    const tagsQuery = tagsId.join(",");
    const platformsQuery = platformsId.join(",");
    const url = `${this.baseUrl}/games?key=${this.apiKey}&tags=${tagsQuery}&page=${page}&platforms=${platformsQuery}`;
    const data = await this.fetchData(url);
    return data;
  }

  async getGameRequirements(productId: string): Promise<GameAPIResponse> {
    const url = `${this.baseUrl}/games/${productId}?key=${this.apiKey}`;
    return this.fetchData(url);
  }
}

const fetchService: IFetchService = new FetchService();
export default fetchService;
