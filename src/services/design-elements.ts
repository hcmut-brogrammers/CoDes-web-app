import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { DesignElement } from '@/types/design-element';

interface IFetchDesignElementsParams {
  design_project_id: string;
}
interface IFetchDesignElementsResponse {
  elements: DesignElement[];
}
export const fetchDesignElements = async (
  params: IFetchDesignElementsParams,
): Promise<IFetchDesignElementsResponse> => {
  return await apiClient.get<IFetchDesignElementsResponse>(
    ApiEndpoint.DesignElements(params.design_project_id),
  );
};
