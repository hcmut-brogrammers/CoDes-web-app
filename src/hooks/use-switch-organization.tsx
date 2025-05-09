import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { Labels } from '@/assets';
import { AppRoute } from '@/constants/app-routes';
import { MutationKey } from '@/constants/query-client';
import {
  ISwitchOrganizationParams,
  switchOrganization,
} from '@/services/organization';
import useAuthStore from '@/stores/auth-store';
import useGlobalStore from '@/stores/global-store';
import { parseAuthToken } from '@/utils/auth';

const useSwitchOrganization = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [MutationKey.SwitchOrganization],
    mutationFn: async (
      params: Pick<ISwitchOrganizationParams, 'organization_id'>,
    ) => {
      const { accessToken, refreshTokenId } = useAuthStore.getState();
      return await switchOrganization({
        ...params,
        access_token: accessToken,
        refresh_token_id: refreshTokenId,
      });
    },
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
        navigate(AppRoute.Dashboard());
      }
    },
    onError: (error) => {
      console.error(Labels.Console.Error.SignIn, error);
    },
  });
};

export default useSwitchOrganization;
