import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { IRefreshTokenResponse } from '@/types/authentication';
import { UserRole } from '@/types/user';

export interface ISignUpParams {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}
interface ISignUpResponse extends IRefreshTokenResponse {}
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
