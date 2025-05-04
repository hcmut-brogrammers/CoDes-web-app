import { DesignProjectQuery } from './design-project';
import { OrganizationQuery } from './organization';
import { OrganizationMembersQuery } from './organization-members';
import { UserInvitationQuery } from './user-invitation';

export const QueryData = {
  ...OrganizationQuery,
  ...UserInvitationQuery,
  ...OrganizationMembersQuery,
  ...DesignProjectQuery,
};
