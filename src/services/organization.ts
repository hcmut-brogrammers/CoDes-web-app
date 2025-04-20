import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { IOrganization } from '@/styles/organization';

interface ICreateOrganizationParams {
  name: string;
  avatar_url?: string;
}
interface ICreateOrganizationResponse {
  created_organization: IOrganization;
}
export const createOrganization = async (
  params: ICreateOrganizationParams,
): Promise<ICreateOrganizationResponse> => {
  // NOTE: mock create a default organization
  // await delay(1000);
  // const mockOrganization = MockData.mockOrganization();
  // return { created_organization: mockOrganization };

  return await apiClient.post<
    ICreateOrganizationResponse,
    ICreateOrganizationParams
  >(ApiEndpoint.Organizations, params);
};

interface IFetchOrganizationsResponse {
  organizations: IOrganization[];
}
export const fetchOrganizations =
  async (): Promise<IFetchOrganizationsResponse> => {
    // NOTE: mock create a default organization
    // await delay(1000);
    // const mockOrganization = MockData.mockOrganization();
    // return { organizations: [mockOrganization] };

    return await apiClient.get<IFetchOrganizationsResponse>(
      ApiEndpoint.Organizations,
    );
  };
