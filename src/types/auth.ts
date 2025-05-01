import { UserRole } from './user';

export interface ITokenData {
  organization_id: string;
  user_id: string;
  username: string;
  email: string;
  role: UserRole;
  sub: string;
  exp: number;
}

export interface IRefreshTokenParams {
  access_token: string;
  refresh_token_id: string;
}

export interface IRefreshTokenResponse extends IRefreshTokenParams {}
