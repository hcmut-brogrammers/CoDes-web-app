import { QueryKey } from '@/constants/query-client';
import useGlobalStore from '@/stores/global-store';
import { IOrganization } from '@/types/organization';

import queryClient from './query-client';

export const OrganizationQuery = {
  getOrganizations: () => {
    return (
      queryClient.getQueryData<IOrganization[]>([QueryKey.Organizations]) || []
    );
  },
  setOrganizations: (organizations: IOrganization[]) => {
    return queryClient.setQueryData<IOrganization[]>(
      [QueryKey.Organizations],
      organizations,
    );
  },
  addOrganization: (organization: IOrganization) => {
    const organizations = OrganizationQuery.getOrganizations();
    if (!organizations) return;

    const updatedOrganizations = [...organizations, organization];
    OrganizationQuery.setOrganizations(updatedOrganizations);
  },
  deleteOrganization: (organizationId: string) => {
    const organizations = OrganizationQuery.getOrganizations();
    if (!organizations) return;

    const { setCurrentOrganizationId } = useGlobalStore.getState();
    const updatedOrganizations = organizations.filter(
      (organization) => organization.id !== organizationId,
    );
    const defaultOrganization = organizations.find(
      (organization) => organization.is_default,
    );
    if (!defaultOrganization) return;

    setCurrentOrganizationId(defaultOrganization.id);
    OrganizationQuery.setOrganizations(updatedOrganizations);
  },
  updateOrganization: (
    organizationId: string,
    updater: (organization: IOrganization) => IOrganization,
  ) => {
    const organizations = OrganizationQuery.getOrganizations();
    if (!organizations) return;

    const updatedOrganizations = organizations.map((organization) =>
      organization.id === organizationId ? updater(organization) : organization,
    );
    OrganizationQuery.setOrganizations(updatedOrganizations);
  },
};
