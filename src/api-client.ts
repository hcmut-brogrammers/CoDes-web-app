import { RequestHeader, RequestMethod } from './constants/api';
import { appEnv } from './constants/app-env';

class ApiClient {
  constructor(private readonly baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async _sendRequest<TResponse, TRequest>(
    endpoint: string,
    method: RequestMethod,
    data?: TRequest,
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: method as string,
      headers: {
        [RequestHeader.ContentType]: 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const jsonResponse = (await response.json()) as TResponse;
    return jsonResponse;
  }

  async post<TResponse, TRequestBody = unknown>(
    endpoint: string,
    data: TRequestBody,
  ): Promise<TResponse> {
    return await this._sendRequest<TResponse, TRequestBody>(
      endpoint,
      RequestMethod.POST,
      data,
    );
  }

  async get<TResponse, TRequestBody = unknown>(
    endpoint: string,
  ): Promise<TResponse> {
    return await this._sendRequest<TResponse, TRequestBody>(
      endpoint,
      RequestMethod.GET,
    );
  }
}

const apiClient = new ApiClient(appEnv.ApiBaseUrl);

export default apiClient;
