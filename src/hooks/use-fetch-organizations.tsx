import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchOrganizations } from '@/services/organization';
import useGlobalStore from '@/stores/global-store';

const useFetchOrganizations = () => {
  const { checkIfIsAuthenticated } = useGlobalStore();
  return useQuery({
    queryKey: [QueryKey.Organizations],
    queryFn: fetchOrganizations,
    enabled: checkIfIsAuthenticated(),
    // TODO: understand this param
    gcTime: 0,
  });
};

export default useFetchOrganizations;
