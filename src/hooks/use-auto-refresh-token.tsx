import { useCallback, useEffect } from 'react';

import useGlobalStore from '@/stores/global-store';
import { isAuthTokenExpired, parseAuthToken } from '@/utils/authentication';

import useRefreshToken from './use-refresh-token';

const useAutoRefreshToken = () => {
  const { accessToken, refreshTokenId, checkIfIsAuthenticated } =
    useGlobalStore();
  const { mutateAsync: refreshTokenAsync } = useRefreshToken();

  const isAuthenticated = checkIfIsAuthenticated();

  const handleRefreshToken = useCallback(
    async (accessToken: string, refreshTokenId: string) => {
      await refreshTokenAsync({
        access_token: accessToken,
        refresh_token_id: refreshTokenId,
      });
    },
    [refreshTokenAsync],
  );

  useEffect(() => {
    if (isAuthenticated) {
      const parsedTokenData = parseAuthToken(accessToken);
      if (parsedTokenData && isAuthTokenExpired(parsedTokenData)) {
        handleRefreshToken(accessToken, refreshTokenId);
      } else {
        console.log('Token is valid, no need to refresh');
      }
    }
  }, [isAuthenticated, handleRefreshToken]);
};

export default useAutoRefreshToken;
