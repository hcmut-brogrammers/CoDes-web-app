import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchDesignElements } from '@/services/design-elements';
import useAuthStore from '@/stores/auth-store';
import useGlobalStore from '@/stores/global-store';

const useFetchDesignElements = () => {
  const { currentOrganizationId, currentDesignProjectId } = useGlobalStore();
  const { checkIfIsAuthenticated } = useAuthStore();

  const enabled =
    !!currentDesignProjectId &&
    !!currentOrganizationId &&
    checkIfIsAuthenticated();

  return useQuery({
    queryKey: [
      currentOrganizationId,
      currentDesignProjectId,
      QueryKey.DesignElements,
    ],
    queryFn: async () => {
      const response = await fetchDesignElements({
        design_project_id: currentDesignProjectId,
      });
      return response.elements || [];
    },
    enabled,
  });
};

export default useFetchDesignElements;
