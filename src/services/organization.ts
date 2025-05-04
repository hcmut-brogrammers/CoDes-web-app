import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { IRefreshTokenParams, IRefreshTokenResponse } from '@/types/auth';
import { IOrganization, IOrganizationMember } from '@/types/organization';

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
  return await apiClient.post<
    ICreateOrganizationResponse,
    ICreateOrganizationParams
  >(ApiEndpoint.Organizations(), params);
};

interface IFetchOrganizationsResponse {
  organizations: IOrganization[];
}
export const fetchOrganizations =
  async (): Promise<IFetchOrganizationsResponse> => {
    return await apiClient.get<IFetchOrganizationsResponse>(
      ApiEndpoint.Organizations(),
    );
  };

interface IFetchOrganizationParams {
  organizationId: string;
}
interface IFetchOrganizationResponse {
  organization: IOrganization;
}
export const fetchOrganization = async (
  params: IFetchOrganizationParams,
): Promise<IFetchOrganizationResponse> => {
  return await apiClient.get<IFetchOrganizationResponse>(
    ApiEndpoint.Organization(params.organizationId),
  );
};

interface IUpdateOrganizationParams {
  organizationId: string;
  updates: Pick<IOrganization, 'name' | 'avatar_url'>;
}
interface IUpdateOrganizationResponse {
  organization: IOrganization;
}
export const updateOrganization = async (
  params: IUpdateOrganizationParams,
): Promise<IUpdateOrganizationResponse> => {
  return await apiClient.put<IUpdateOrganizationResponse>(
    ApiEndpoint.Organization(params.organizationId),
    params.updates,
  );
};

export interface IDeleteOrganizationParams {
  organizationId: string;
}
interface IDeleteOrganizationResponse {
  deleted_organization: IOrganization;
}
export const deleteOrganization = async (
  params: IDeleteOrganizationParams,
): Promise<IDeleteOrganizationResponse> => {
  return await apiClient.delete<IDeleteOrganizationResponse>(
    ApiEndpoint.Organization(params.organizationId),
  );
};

export interface ISwitchOrganizationParams extends IRefreshTokenParams {
  organization_id: string;
}
interface ISwitchOrganizationResponse extends IRefreshTokenResponse {}
export const switchOrganization = async (
  params: ISwitchOrganizationParams,
): Promise<ISwitchOrganizationResponse> => {
  return await apiClient.post<ISwitchOrganizationResponse>(
    ApiEndpoint.SwitchOrganization(),
    params,
  );
};

interface IFetchOrganizationMembersResponse {
  members: IOrganizationMember[];
}
export const fetchOrganizationMembers =
  async (): Promise<IFetchOrganizationMembersResponse> => {
    return await apiClient.get<IFetchOrganizationMembersResponse>(
      ApiEndpoint.OrganizationMembers(),
    );
  };
