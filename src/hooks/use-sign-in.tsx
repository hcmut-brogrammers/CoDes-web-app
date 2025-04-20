import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/assets';
import { MutationKey } from '@/constants/query-client';
import { signIn } from '@/services/authentication';
import useGlobalStore from '@/stores/global-store';
import { parseAuthToken } from '@/utils/authentication';

const useSignIn = () => {
  return useMutation({
    mutationKey: [MutationKey.SignIn],
    mutationFn: signIn,
    onSuccess: async (data) => {
      const { setAccessToken, setRefreshTokenId, setTokenData } =
        useGlobalStore.getState();
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
      const parsedTokenData = parseAuthToken(data.access_token);
      if (parsedTokenData) {
        setTokenData(parsedTokenData);
      }
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignIn, error);
    },
  });
};

export default useSignIn;
