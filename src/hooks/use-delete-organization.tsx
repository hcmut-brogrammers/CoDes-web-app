import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import {
  deleteOrganization,
  IDeleteOrganizationParams,
} from '@/services/organization';

const useDeleteOrganization = () => {
  return useMutation({
    mutationKey: [MutationKey.DeleteOrganization],
    mutationFn: async (variables: IDeleteOrganizationParams) => {
      const response = await deleteOrganization(variables);
      return response.deleted_organization;
    },
    onSuccess: (data) => {
      QueryData.deleteOrganization(data.id);
    },
  });
};

export default useDeleteOrganization;
