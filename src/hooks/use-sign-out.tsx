import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import useAuthStore, { initializeAuthStore } from '@/stores/global-store';

const useSignOut = () => {
  return useMutation({
    mutationKey: [MutationKey.SignOut],
    mutationFn: async () => {
      const { setAccessToken, setRefreshTokenId, setTokenData } =
        useAuthStore.getState();
      setAccessToken('');
      setRefreshTokenId('');
      setTokenData(initializeAuthStore().tokenData);
    },
  });
};

export default useSignOut;
