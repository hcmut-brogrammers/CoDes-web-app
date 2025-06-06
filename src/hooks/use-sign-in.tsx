import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/assets';
import { MutationKey } from '@/constants/query-client';
import { signIn } from '@/services/auth';
import useAuthStore from '@/stores/auth-store';
import useGlobalStore from '@/stores/global-store';
import { parseAuthToken } from '@/utils/auth';

const useSignIn = () => {
  return useMutation({
    mutationKey: [MutationKey.SignIn],
    mutationFn: signIn,
    onSuccess: async (data) => {
      const { setCurrentOrganizationId } = useGlobalStore.getState();
      const { setAccessToken, setRefreshTokenId, setTokenData } =
        useAuthStore.getState();
      setAccessToken(data.access_token);
      setRefreshTokenId(data.refresh_token_id);
      const parsedTokenData = parseAuthToken(data.access_token);
      if (parsedTokenData) {
        setTokenData(parsedTokenData);
        setCurrentOrganizationId(parsedTokenData.organization_id);
      }
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignIn, error);
    },
  });
};

export default useSignIn;
