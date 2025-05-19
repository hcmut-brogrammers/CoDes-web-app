import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import { duplicateDesignProject } from '@/services/design-project';

const useDuplicateDesignProject = () => {
  return useMutation({
    mutationKey: [MutationKey.DuplicateDesignProject],
    mutationFn: duplicateDesignProject,
    onSuccess: ({ duplicated_project }) => {
      QueryData.addDesignProject(duplicated_project);
    },
  });
};

export default useDuplicateDesignProject;
