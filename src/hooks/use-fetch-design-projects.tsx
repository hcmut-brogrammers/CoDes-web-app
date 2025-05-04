import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchDesignProjects } from '@/services/design-project';
import useAuthStore from '@/stores/auth-store';

const RefetchIntervalMs = 1000 * 60 * 5; // 5 minutes
const useFetchDesignProjects = () => {
  const { tokenData, checkIfIsAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: [tokenData.organization_id, QueryKey.DesignProjects],
    queryFn: async () => {
      const response = await fetchDesignProjects();
      return response.projects || [];
    },
    enabled: checkIfIsAuthenticated(),
    refetchInterval: RefetchIntervalMs,
  });
};

export default useFetchDesignProjects;
