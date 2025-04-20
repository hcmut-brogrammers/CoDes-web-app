import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { UserRole } from '@/types/user';

export interface ISignUpParams {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}
interface ISignUpResponse {
  access_token: string;
  refresh_token_id: string;
}
export const signUp = async (params: ISignUpParams) => {
  return await apiClient.post<ISignUpResponse, ISignInParams>(
    ApiEndpoint.SignUp,
    params,
  );
};

export interface ISignInParams {
  email: string;
  password: string;
}
interface ISignInResponse extends ISignUpResponse {}
export const signIn = async (params: ISignInParams) => {
  return await apiClient.post<ISignInResponse, ISignInParams>(
    ApiEndpoint.SignIn,
    params,
  );
};

interface IRefreshTokenParams extends ISignInResponse {}
interface IRefreshTokenResponse extends ISignInResponse {}
export const refreshToken = async (params: IRefreshTokenParams) => {
  return await apiClient.post<IRefreshTokenParams, IRefreshTokenResponse>(
    ApiEndpoint.RefreshToken,
    params,
  );
};
