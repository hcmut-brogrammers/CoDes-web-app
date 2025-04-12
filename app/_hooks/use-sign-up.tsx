'use client';

import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/_assets';
import { MutationKey } from '@/_constants/query-client';
import { signUp } from '@/_services/authenticate';
import useGlobalStore from '@/_stores/global-store';

const useSignUp = () => {
  const { setAccessToken, setRefreshTokenId } = useGlobalStore();

  return useMutation({
    mutationKey: [MutationKey.SignUp],
    mutationFn: signUp,
    onSuccess: async (data) => {
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignUp, error);
    },
  });
};

export default useSignUp;
