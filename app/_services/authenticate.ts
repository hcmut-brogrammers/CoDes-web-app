import { ApiEndpoint } from '@/_constants/api';
import { UserRole } from '@/_types/user';
import apiClient from '@/api-client';

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
