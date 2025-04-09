import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/_constants/query-client';
import useGlobalStore from '@/_stores/global-store';

const useSignOut = () => {
  const { setAccessToken, setRefreshTokenId } = useGlobalStore();

  return useMutation({
    mutationKey: [MutationKey.SignOut],
    mutationFn: async () => {
      setAccessToken(null);
      setRefreshTokenId(null);
    },
  });
};

export default useSignOut;
