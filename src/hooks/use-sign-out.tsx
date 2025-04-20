import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import useGlobalStore from '@/stores/global-store';

const useSignOut = () => {
  return useMutation({
    mutationKey: [MutationKey.SignOut],
    mutationFn: async () => {
      const { setAccessToken, setRefreshTokenId } = useGlobalStore.getState();
      setAccessToken('');
      setRefreshTokenId('');
    },
  });
};

export default useSignOut;
