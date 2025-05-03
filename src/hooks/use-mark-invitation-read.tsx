import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import {
  IMarkUserInvitationAsReadParams,
  markUserInvitationAsRead,
} from '@/services/invitation';

interface IVariables extends IMarkUserInvitationAsReadParams {}

const useMarkInvitationAsRead = () => {
  return useMutation({
    mutationKey: [MutationKey.MarkInvitationAsRead],
    mutationFn: async ({ invitation_id }: IVariables) => {
      return await markUserInvitationAsRead({
        invitation_id,
      });
    },
    onSuccess: (data, { invitation_id }) => {
      if (data.success) {
        QueryData.updateUserInvitation(invitation_id, (invitation) => ({
          ...invitation,
          is_read: true,
        }));
      }
    },
  });
};

export default useMarkInvitationAsRead;
