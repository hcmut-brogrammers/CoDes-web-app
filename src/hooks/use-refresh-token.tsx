import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { refreshToken } from '@/services/authentication';
import useGlobalStore from '@/stores/global-store';

const useRefreshToken = () => {
  return useMutation({
    mutationKey: [MutationKey.RefreshToken],
    mutationFn: refreshToken,
    onSuccess: (data) => {
      const { setAccessToken, setRefreshTokenId } = useGlobalStore.getState();
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
    },
  });
};

export default useRefreshToken;
