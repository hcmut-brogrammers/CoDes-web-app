import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchOrganization } from '@/services/organization';
import useAuthStore from '@/stores/auth-store';
import useGlobalStore from '@/stores/global-store';

const useFetchOrganization = () => {
  const { currentOrganizationId } = useGlobalStore();
  const { checkIfIsAuthenticated } = useAuthStore();

  const enabled = !!currentOrganizationId && checkIfIsAuthenticated();
  return useQuery({
    queryKey: [QueryKey.Organizations, currentOrganizationId],
    queryFn: async () => {
      const response = await fetchOrganization({
        organizationId: currentOrganizationId,
      });
      return response.organization;
    },
    enabled,
    gcTime: 0,
  });
};

export default useFetchOrganization;
