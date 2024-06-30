import IRequestService from "../interfaces/iRequestService";
import { RequestResponse } from "../helpers/types";

export class RequestService implements IRequestService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3000/api/") {
    this.baseUrl = baseUrl;
  }

  public async request<T>(
    endpoint: string,
    method: string,
    body?: unknown
  ): Promise<RequestResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: RequestResponse<T> = await response.json();
    return data;
  }

  public async getMethod<T>(endpoint: string): Promise<RequestResponse<T>> {
    return await this.request(endpoint, "GET");
  }

  public async postMethod<T>(
    endpoint: string,
    body?: unknown
  ): Promise<RequestResponse<T>> {
    return await this.request(endpoint, "POST", body);
  }

  public async deleteMethod<T>(
    endpoint: string,
    body?: unknown
  ): Promise<RequestResponse<T>> {
    return await this.request(endpoint, "DELETE", body);
  }

  public async patchMethod<T>(
    endpoint: string,
    body?: unknown
  ): Promise<RequestResponse<T>> {
    return await this.request(endpoint, "PATCH", body);
  }
}

const requestService: IRequestService = new RequestService();
export default requestService;
