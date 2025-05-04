import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchOrganizationMembers } from '@/services/organization';
import useAuthStore from '@/stores/auth-store';

const RefetchIntervalMs = 1000 * 60 * 1;
const useFetchOrganizationMembers = () => {
  const { tokenData, checkIfIsAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: [tokenData.organization_id, QueryKey.OrganizationMembers],
    queryFn: async () => {
      const response = await fetchOrganizationMembers();
      return response.members || [];
    },
    enabled: checkIfIsAuthenticated(),
    refetchInterval: RefetchIntervalMs,
  });
};

export default useFetchOrganizationMembers;
