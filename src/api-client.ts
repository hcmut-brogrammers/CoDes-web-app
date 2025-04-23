import { vsprintf } from 'sprintf-js';

import { ApiEndpoint, RequestHeader, RequestMethod } from './constants/api';
import { appEnv } from './constants/app-env';
import { ResponseStatus } from './constants/enum';
import useAuthStore from './stores/global-store';
import {
  IRefreshTokenParams,
  IRefreshTokenResponse,
} from './types/authentication';
import { parseAuthToken } from './utils/authentication';
import { Labels } from './assets';

const DefaultMaxRetries = 2;

interface IApiClientOptions {
  baseUrl: string;
  maxRetries: number;
}
class ApiClient {
  private readonly AssumedAlmostExpired = 5 * 60 * 1000; // 5 minutes
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

    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      headers[RequestHeader.Authorization] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  private _checkIfIsRefreshTokenEndpoint(endpoint: string): boolean {
    return endpoint === ApiEndpoint.RefreshToken;
  }

  private async _refreshToken() {
    const {
      accessToken,
      refreshTokenId,
      setAccessToken,
      setRefreshTokenId,
      setTokenData,
    } = useAuthStore.getState();

    const response = await this.post<
      IRefreshTokenResponse,
      IRefreshTokenParams
    >(ApiEndpoint.RefreshToken, {
      access_token: accessToken,
      refresh_token_id: refreshTokenId,
    });
    setAccessToken(response.access_token);
    setRefreshTokenId(response.refresh_token_id);
    const tokenData = parseAuthToken(response.access_token);
    if (tokenData) {
      setTokenData(tokenData);
    }
  }

  private _makeRequest<TRequest>(
    endpoint: string,
    method: RequestMethod,
    data?: TRequest,
  ) {
    const { accessToken } = useAuthStore.getState();
    const tokenData = parseAuthToken(accessToken);
    if (tokenData && !this._checkIfIsRefreshTokenEndpoint(endpoint)) {
      const now = new Date().getTime();
      const expirationTime = tokenData.exp * 1000;
      const isAccessTokenAlmostExpired =
        expirationTime - now < this.AssumedAlmostExpired;
      if (isAccessTokenAlmostExpired) {
        return Promise.resolve(
          new Response(null, { status: ResponseStatus.Unauthorized }),
        );
      }
    }

    return fetch(`${this.baseUrl}${endpoint}`, {
      method: method as string,
      headers: { ...this._getHeaders() },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  private async _interceptRequest(request: Promise<Response>) {
    let response: Response;
    try {
      response = await request;
    } catch (err) {
      if (window.navigator.onLine) throw err;
      throw new Error(vsprintf(Labels.Error.NetworkError, [err]));
    }
    return response;
  }

  private async _checkIfShouldResendRequest(
    response: Response,
    endpoint: string,
    retriesLeft: number,
  ): Promise<boolean> {
    if (retriesLeft <= 0) {
      return false;
    }

    if (response.status !== ResponseStatus.Unauthorized) {
      return false;
    }

    if (this._checkIfIsRefreshTokenEndpoint(endpoint)) {
      return false;
    }

    await this._refreshToken();
    return true;
  }

  private _interceptResponse(response: Response) {
    const status = response.status;
    if (status === ResponseStatus.Unauthorized) {
      console.error(Labels.Console.Error.Unauthorized);
      throw new Error(Labels.Error.Unauthorized);
    }
  }

  private async _sendRequest<TResponse, TRequest>(
    endpoint: string,
    method: RequestMethod,
    data?: TRequest,
    retriesLeft: number = this.maxRetries,
  ): Promise<TResponse> {
    const request = this._makeRequest<TRequest>(endpoint, method, data);
    const response = await this._interceptRequest(request);

    if (
      await this._checkIfShouldResendRequest(response, endpoint, retriesLeft)
    ) {
      return await this._sendRequest<TResponse, TRequest>(
        endpoint,
        method,
        data,
        retriesLeft - 1,
      );
    }
    this._interceptResponse(response);

    if (!response.ok) {
      throw new Error(vsprintf(Labels.Error.HttpError, [response.status]));
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

const apiClient = new ApiClient({
  baseUrl: appEnv.ApiBaseUrl,
  maxRetries: DefaultMaxRetries,
});

export default apiClient;
