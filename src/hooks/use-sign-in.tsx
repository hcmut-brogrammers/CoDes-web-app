import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/assets';
import { MutationKey } from '@/constants/query-client';
import { signIn } from '@/services/authenticate';
import useGlobalStore from '@/stores/global-store';

const useSignIn = () => {
  return useMutation({
    mutationKey: [MutationKey.SignIn],
    mutationFn: signIn,
    onSuccess: async (data) => {
      const { setAccessToken, setRefreshTokenId } = useGlobalStore.getState();
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignIn, error);
    },
  });
};

export default useSignIn;
