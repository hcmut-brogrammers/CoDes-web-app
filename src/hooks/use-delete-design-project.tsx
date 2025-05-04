import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import {
  deleteDesignProject,
  IDeleteDesignProjectParams,
} from '@/services/design-project';

interface IVariables extends IDeleteDesignProjectParams {}

const useDeleteDesignProject = () => {
  return useMutation({
    mutationKey: [MutationKey.DeleteDesignProject],
    mutationFn: async ({ design_project_id }: IVariables) => {
      const response = await deleteDesignProject({ design_project_id });
      return response.deleted_project;
    },
    onSuccess: (data) => {
      QueryData.deleteDesignProject(data.id);
    },
  });
};

export default useDeleteDesignProject;
