import { RequestHeader, RequestMethod } from './constants/api';
import { appEnv } from './constants/app-env';
import useGlobalStore from './stores/global-store';

const DefaultMaxRetries = 2;

interface IApiClientOptions {
  baseUrl: string;
  maxRetries: number;
}
class ApiClient {
  private readonly baseUrl: string;
  private readonly maxRetries: number;
  constructor({ baseUrl, maxRetries }: IApiClientOptions) {
    this.baseUrl = baseUrl;
    this.maxRetries = maxRetries;
  }

  private _getHeaders() {
    const headers: Record<string, string> = {
      [RequestHeader.ContentType]: 'application/json',
    };

    const { accessToken } = useGlobalStore.getState();
    if (accessToken) {
      headers[RequestHeader.Authorization] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  private _isServerError(response: Response) {
    return response.status >= 500 && response.status < 600;
  }

  private async _sendRequest<TResponse, TRequest>(
    endpoint: string,
    method: RequestMethod,
    data?: TRequest,
    retriesLeft: number = this.maxRetries,
  ): Promise<TResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: method as string,
        headers: { ...this._getHeaders() },
        body: data ? JSON.stringify(data) : undefined,
      });
      if (!response.ok) {
        if (this._isServerError(response)) {
          return this._sendRequest<TResponse, TRequest>(
            endpoint,
            method,
            data,
            retriesLeft - 1,
          );
        }
        throw new Error(`Error: ${response.statusText}`);
      }

      const jsonResponse = (await response.json()) as TResponse;
      return jsonResponse;
    } catch (err) {
      // NOTE: retry on network errors
      if (retriesLeft > 0) {
        return this._sendRequest<TResponse, TRequest>(
          endpoint,
          method,
          data,
          retriesLeft - 1,
        );
      }
      throw err;
    }
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

const apiClient = new ApiClient({
  baseUrl: appEnv.ApiBaseUrl,
  maxRetries: DefaultMaxRetries,
});

export default apiClient;
