import { ApiEndpoint } from '@/_constants/api';
import { IOrganization } from '@/_types/organization';
import apiClient from '@/api-client';

interface ICreateOrganizationParams {
  name: string;
  avatar_url?: string;
}
interface ICreateOrganizationResponse {
  created_organization: IOrganization;
}
export const createOrganization = async (params: ICreateOrganizationParams) => {
  return await apiClient.post<
    ICreateOrganizationResponse,
    ICreateOrganizationParams
  >(ApiEndpoint.Organizations, params);
};

interface IFetchOrganizationsResponse {
  organizations: IOrganization[];
}
export const fetchOrganizations = async () => {
  return await apiClient.get<IFetchOrganizationsResponse>(
    ApiEndpoint.Organizations,
  );
};
