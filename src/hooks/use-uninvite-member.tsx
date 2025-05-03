import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import { IUninviteMemberParams, uninviteMember } from '@/services/invitation';
import { ToastManager } from '@/utils/toast';

interface IVariables extends IUninviteMemberParams {
  member_email: string;
}

const useUninviteMember = () => {
  return useMutation({
    mutationKey: [MutationKey.UninviteMember],
    mutationFn: async ({ member_id }: IVariables) => {
      return await uninviteMember({ member_id });
    },
    onSuccess: (_, { member_email, member_id }) => {
      QueryData.invalidateOrganizations();
      QueryData.deleteOrganizationMember(member_id);
      ToastManager.Success.UninviteMember(member_email);
    },
  });
};

export default useUninviteMember;
