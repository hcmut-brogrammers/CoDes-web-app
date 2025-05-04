import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import {
  IMarkUserInvitationAsUnreadParams,
  markUserInvitationAsUnread,
} from '@/services/invitation';

interface IVariables extends IMarkUserInvitationAsUnreadParams {}

const useMarkInvitationAsUnread = () => {
  return useMutation({
    mutationKey: [MutationKey.MarkInvitationAsUnread],
    mutationFn: async ({ invitation_id }: IVariables) => {
      return await markUserInvitationAsUnread({
        invitation_id: invitation_id,
      });
    },
    onSuccess: (data, { invitation_id }) => {
      if (data.success) {
        QueryData.updateUserInvitation(invitation_id, (invitation) => ({
          ...invitation,
          is_read: false,
        }));
      }
    },
  });
};

export default useMarkInvitationAsUnread;
