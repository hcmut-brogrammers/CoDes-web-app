import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { createOrganization } from '@/services/organization';

const useCreateOrganization = () => {
  return useMutation({
    mutationKey: [MutationKey.CreateOrganization],
    mutationFn: createOrganization,
  });
};

export default useCreateOrganization;
