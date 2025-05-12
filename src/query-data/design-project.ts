import { QueryKey } from '@/constants/query-client';
import useAuthStore from '@/stores/auth-store';
import { IDesignProject } from '@/types/design-project';

import queryClient from './query-client';

export const DesignProjectQuery = {
  getDesignProjects: () => {
    const { tokenData } = useAuthStore.getState();
    if (!tokenData) return [];

    return (
      queryClient.getQueryData<IDesignProject[]>([
        tokenData.organization_id,
        QueryKey.DesignProjects,
      ]) || []
    );
  },
  setDesignProjects: (designProjects: IDesignProject[]) => {
    const { tokenData } = useAuthStore.getState();
    if (!tokenData) return [];

    return queryClient.setQueryData<IDesignProject[]>(
      [tokenData.organization_id, QueryKey.DesignProjects],
      designProjects,
    );
  },
  getDesignProject: (designProjectId: string) => {
    const designProjects = DesignProjectQuery.getDesignProjects();
    if (!designProjects) return null;
    const designProject = designProjects.find(
      (designProject) => designProject.id === designProjectId,
    );
    if (!designProject) return null;

    return designProject;
  },
  addDesignProject: (designProject: IDesignProject) => {
    const designProjects = DesignProjectQuery.getDesignProjects();
    if (!designProjects) return;

    const updatedDesignProjects = [...designProjects, designProject];
    DesignProjectQuery.setDesignProjects(updatedDesignProjects);
  },
  deleteDesignProject: (designProjectId: string) => {
    const designProjects = DesignProjectQuery.getDesignProjects();
    if (!designProjects) return;

    const updatedDesignProjects = designProjects.filter(
      (designProject) => designProject.id !== designProjectId,
    );
    DesignProjectQuery.setDesignProjects(updatedDesignProjects);
  },
  invalidateDesignProjects: () => {
    const { tokenData } = useAuthStore.getState();
    if (!tokenData) return [];

    return queryClient.invalidateQueries({
      queryKey: [tokenData.organization_id, QueryKey.DesignProjects],
    });
  },
};
