import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/assets';
import { MutationKey } from '@/constants/query-client';
import { signUp } from '@/services/authenticate';
import useGlobalStore from '@/stores/global-store';

const useSignUp = () => {
  return useMutation({
    mutationKey: [MutationKey.SignUp],
    mutationFn: signUp,
    onSuccess: async (data) => {
      const { setAccessToken, setRefreshTokenId } = useGlobalStore.getState();
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignUp, error);
    },
  });
};

export default useSignUp;
