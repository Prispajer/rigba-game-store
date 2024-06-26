import { ResponseData, RequestResponse } from "../helpers/types";

export interface IRequestService {
  request(method: string, body?: any): Promise<RequestResponse<ResponseData>>;
  getMethod(endpoint: string): Promise<RequestResponse<ResponseData>>;
  postMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<ResponseData>>;
  deleteMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<ResponseData>>;
  patchMethod(
    endpoint: string,
    body?: RequestData
  ): Promise<RequestResponse<ResponseData>>;
}
