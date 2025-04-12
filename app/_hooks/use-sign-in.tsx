'use client';

import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/_assets';
import { MutationKey } from '@/_constants/query-client';
import { signIn } from '@/_services/authenticate';
import useGlobalStore from '@/_stores/global-store';

const useSignIn = () => {
  const { setAccessToken, setRefreshTokenId } = useGlobalStore();

  return useMutation({
    mutationKey: [MutationKey.SignIn],
    mutationFn: signIn,
    onSuccess: async (data) => {
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignIn, error);
    },
  });
};

export default useSignIn;
