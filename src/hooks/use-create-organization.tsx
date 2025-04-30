import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import { createOrganization } from '@/services/organization';

const useCreateOrganization = () => {
  return useMutation({
    mutationKey: [MutationKey.CreateOrganization],
    mutationFn: createOrganization,
    onSuccess: (data) => {
      const createdOrganization = data.created_organization;
      QueryData.addOrganization(createdOrganization);
    },
  });
};

export default useCreateOrganization;
