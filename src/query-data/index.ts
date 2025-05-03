import { OrganizationMembersQuery } from './organization-members';
import { OrganizationQuery } from './organization-query';
import { UserInvitationQuery } from './user-invitation';

export const QueryData = {
  ...OrganizationQuery,
  ...UserInvitationQuery,
  ...OrganizationMembersQuery,
};
