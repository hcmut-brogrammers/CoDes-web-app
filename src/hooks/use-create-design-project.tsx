import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import { createDesignProject } from '@/services/design-project';

const useCreateDesignProject = () => {
  return useMutation({
    mutationKey: [MutationKey.CreateDesignProject],
    mutationFn: createDesignProject,
    onSuccess: ({ created_project }) => {
      QueryData.addDesignProject(created_project);
    },
  });
};

export default useCreateDesignProject;
