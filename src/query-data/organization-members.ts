import { QueryKey } from '@/constants/query-client';
import useAuthStore from '@/stores/auth-store';
import { IOrganizationMember } from '@/types/organization';

import queryClient from './query-client';

export const OrganizationMembersQuery = {
  getOrganizationMembers: () => {
    const { tokenData } = useAuthStore.getState();
    if (!tokenData) return [];

    return (
      queryClient.getQueryData<IOrganizationMember[]>([
        tokenData.organization_id,
        QueryKey.OrganizationMembers,
      ]) || []
    );
  },
  setOrganizationMembers: (members: IOrganizationMember[]) => {
    const { tokenData } = useAuthStore.getState();
    if (!tokenData) return [];

    return queryClient.setQueryData<IOrganizationMember[]>(
      [tokenData.organization_id, QueryKey.OrganizationMembers],
      members,
    );
  },
  invalidateOrganizationMembers: () => {
    const { tokenData } = useAuthStore.getState();
    if (!tokenData) return;

    return queryClient.invalidateQueries({
      queryKey: [tokenData.organization_id, QueryKey.OrganizationMembers],
    });
  },
  deleteOrganizationMember: (memberId: string) => {
    const members = OrganizationMembersQuery.getOrganizationMembers();
    if (!members) return;

    const updatedMembers = members.filter(
      (member) => member.member_id !== memberId,
    );
    OrganizationMembersQuery.setOrganizationMembers(updatedMembers);
  },
};
