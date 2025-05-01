import { useMutation } from '@tanstack/react-query';

import { MutationKey, QueryKey } from '@/constants/query-client';
import queryClient from '@/query-data/query-client';
import { updateOrganization } from '@/services/organization';

const useUpdateOrganization = () => {
  return useMutation({
    mutationKey: [MutationKey.UpdateOrganization],
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Organizations],
      });
    },
  });
};

export default useUpdateOrganization;
