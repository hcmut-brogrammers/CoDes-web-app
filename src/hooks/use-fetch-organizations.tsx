import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchOrganizations } from '@/services/organization';
import useAuthStore from '@/stores/auth-store';

const useFetchOrganizations = () => {
  const { checkIfIsAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: [QueryKey.Organizations],
    queryFn: async () => {
      const response = await fetchOrganizations();
      return response.organizations || [];
    },
    enabled: checkIfIsAuthenticated(),
    gcTime: 0,
  });
};

export default useFetchOrganizations;
