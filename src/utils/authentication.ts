import { jwtDecode } from 'jwt-decode';

import { Labels } from '@/assets';
import { ITokenData } from '@/types/authentication';
import { Nullable } from '@/types/common';

export const parseAuthToken = (token: string): Nullable<ITokenData> => {
  try {
    return jwtDecode<ITokenData>(token);
  } catch (err) {
    console.error(Labels.Console.Error.ParseJwtTokenPayload, err);
    return null;
  }
};

export const isAuthTokenExpired = (
  tokenData: ITokenData,
  expirationHoursAssumed: number = 0,
): boolean => {
  const currentTime =
    Math.floor(Date.now() / 1000) + expirationHoursAssumed * 60 * 60 * 1000;
  return tokenData.exp <= currentTime;
};
