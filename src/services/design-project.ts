import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { IDesignProject } from '@/types/design-project';

interface ICreateDesignProjectParams {
  name: string;
}
interface ICreateDesignProjectResponse {
  created_project: IDesignProject;
}
export const createDesignProject = async (
  params: ICreateDesignProjectParams,
): Promise<ICreateDesignProjectResponse> => {
  return await apiClient.post<
    ICreateDesignProjectResponse,
    ICreateDesignProjectParams
  >(ApiEndpoint.DesignProjects(), params);
};

export interface IDuplicateDesignProjectParams {
  design_project_id: string;
}
interface IDuplicateDesignProjectResponse {
  duplicated_project: IDesignProject;
}
export const duplicateDesignProject = async (
  params: IDuplicateDesignProjectParams,
): Promise<IDuplicateDesignProjectResponse> => {
  return await apiClient.post<IDuplicateDesignProjectResponse>(
    ApiEndpoint.DuplicateDesignProject(params.design_project_id),
  );
};

interface IFetchDesignProjectsResponse {
  projects: IDesignProject[];
}
export const fetchDesignProjects =
  async (): Promise<IFetchDesignProjectsResponse> => {
    return await apiClient.get<IFetchDesignProjectsResponse>(
      ApiEndpoint.DesignProjects(),
    );
  };

export interface IDeleteDesignProjectParams {
  design_project_id: string;
}
interface IDeleteDesignProjectResponse {
  deleted_project: IDesignProject;
}
export const deleteDesignProject = async (
  params: IDeleteDesignProjectParams,
): Promise<IDeleteDesignProjectResponse> => {
  return await apiClient.delete<IDeleteDesignProjectResponse>(
    ApiEndpoint.DeleteDesignProject(params.design_project_id),
  );
};
