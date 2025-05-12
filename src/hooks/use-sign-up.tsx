import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/assets';
import { MutationKey } from '@/constants/query-client';
import { signUp } from '@/services/auth';
import useAuthStore from '@/stores/auth-store';
import useGlobalStore from '@/stores/global-store';
import { parseAuthToken } from '@/utils/auth';

const useSignUp = () => {
  return useMutation({
    mutationKey: [MutationKey.SignUp],
    mutationFn: signUp,
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
      console.error(Labels.Console.Error.SignUp, error);
      throw error;
    },
  });
};

export default useSignUp;
