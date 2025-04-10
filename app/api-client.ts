import { RequestHeader, RequestMethod } from './_constants/api';
import { appEnv } from './_constants/app-env';

class ApiClient {
  private accessToken: Nullable<string> = null;
  // TODO: to be used for refreshing the access token
  private refreshTokenId: Nullable<string> = null;
  constructor(private readonly baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private _getHeaders() {
    const headers: Record<string, string> = {
      [RequestHeader.ContentType]: 'application/json',
    };

    if (this.accessToken) {
      headers[RequestHeader.Authorization] = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async _sendRequest<TResponse, TRequest>(
    endpoint: string,
    method: RequestMethod,
    data?: TRequest,
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: method as string,
      headers: { ...this._getHeaders() },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const jsonResponse = (await response.json()) as TResponse;
    return jsonResponse;
  }

  public setAccessToken(accessToken: Nullable<string>) {
    this.accessToken = accessToken;
  }

  public setRefreshTokenId(refreshTokenId: Nullable<string>) {
    this.refreshTokenId = refreshTokenId;
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

const apiClient = new ApiClient(appEnv.ApiUrl);

export default apiClient;
