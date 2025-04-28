import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/assets';
import { MutationKey } from '@/constants/query-client';
import { signUp } from '@/services/authentication';
import useAuthStore from '@/stores/global-store';
import { parseAuthToken } from '@/utils/authentication';

const useSignUp = () => {
  return useMutation({
    mutationKey: [MutationKey.SignUp],
    mutationFn: signUp,
    onSuccess: async (data) => {
      const { setAccessToken, setRefreshTokenId, setTokenData } =
        useAuthStore.getState();
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
      const parsedTokenData = parseAuthToken(data.access_token);
      if (parsedTokenData) {
        setTokenData(parsedTokenData);
      }
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignUp, error);
    },
  });
};

export default useSignUp;
