import { ResponseData, RequestResponse } from "../helpers/types";

export interface IRequestService {
  request(method: string, body?: any): Promise<RequestResponse<t>>;
  getMethod(endpoint: string): Promise<RequestResponse<t>>;
  postMethod(endpoint: string, body?: RequestData): Promise<RequestResponse<t>>;
  deleteMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<t>>;
  patchMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<t>>;
}
