import IFetchService from "../interfaces/iFetchService";
import { GameAPIResponse } from "../helpers/types";

export class FetchService implements IFetchService {
  private apiKey: string = "92d091bb5323482a8f4a23d2dab67947";
  private baseUrl: string = "https://api.rawg.io/api";

  async fetchData(url: string): Promise<any> {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("An error occurred while fetching data from API!", error);
    }
  }

  async getGame(productId: string): Promise<GameAPIResponse> {
    const url = `${this.baseUrl}/games/${productId}?key=${this.apiKey}`;
    return this.fetchData(url);
  }

  async getGames(page: number): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games?page=${page}&key=${this.apiKey}`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGameByOrdering(ordering: string): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games?ordering=${ordering}&key=${this.apiKey}`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGameScreenshots(productId: string): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/games/${productId}/screenshots?key=${this.apiKey}`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGameGenres(): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/genres?key=${this.apiKey}`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGameByGenres(productId: string): Promise<GameAPIResponse> {
    const url = `${this.baseUrl}/genres/${productId}?key=${this.apiKey}`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGameTags(productId: number): Promise<GameAPIResponse> {
    const url = `${this.baseUrl}/tags/${productId}?key=${this.apiKey}`;
    return this.fetchData(url);
  }

  async getGamesByTags(quantity: number): Promise<GameAPIResponse[]> {
    const url = `${this.baseUrl}/tags?page_size=${7 * quantity}&key=${
      this.apiKey
    }`;
    const data = await this.fetchData(url);
    return data.results || [];
  }

  async getGamesByTagsId(
    tagId: string,
    page: number
  ): Promise<GameAPIResponse> {
    const url = `${this.baseUrl}/games?tags=${tagId}&page=${page}&key=${this.apiKey}`;
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
