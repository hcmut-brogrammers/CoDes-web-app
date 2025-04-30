import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchOrganization } from '@/services/organization';
import useAuthStore from '@/stores/auth-store';

const useFetchOrganization = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const { checkIfIsAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: [QueryKey.Organizations, organizationId],
    queryFn: async () => {
      const response = await fetchOrganization({ organizationId });
      return response.organization;
    },
    enabled: checkIfIsAuthenticated(),
    gcTime: 0,
  });
};

export default useFetchOrganization;
