import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/_constants/query-client';
import { createOrganization } from '@/_services/organization';

const useCreateOrganization = () => {
  return useMutation({
    mutationKey: [MutationKey.CreateOrganization],
    mutationFn: createOrganization,
    onSuccess: (data) => {
      // Handle success, e.g., show a success message or redirect
      console.log('Organization created successfully:', data);
    },
  });
};

export default useCreateOrganization;
