import { IRequestService } from "../interfaces/iRequestService";
import { ResponseData, RequestResponse, RequestData } from "../helpers/types";

export class RequestService implements IRequestService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3000/api/") {
    this.baseUrl = baseUrl;
  }

  public async request(
    endpoint: string,
    method: string,
    body?: RequestData
  ): Promise<RequestResponse<ResponseData>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: RequestResponse<ResponseData> = await response.json();
    return data;
  }

  public async getMethod(
    endpoint: string
  ): Promise<RequestResponse<ResponseData>> {
    return await this.request(endpoint, "GET");
  }

  public async postMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<ResponseData>> {
    return await this.request(endpoint, "POST", body);
  }

  public async deleteMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<ResponseData>> {
    return await this.request(endpoint, "DELETE", body);
  }

  public async patchMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<ResponseData>> {
    return await this.request(endpoint, "PATCH", body);
  }
}

const requestService: IRequestService = new RequestService();
export default requestService;
