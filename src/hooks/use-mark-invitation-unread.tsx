import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import { markUserInvitationAsUnread } from '@/services/invitation';
import { ToastManager } from '@/utils/toast';

const useMarkInvitationAsUnread = () => {
  return useMutation({
    mutationKey: [MutationKey.MarkInvitationAsUnread],
    mutationFn: async ({ invitationId }: { invitationId: string }) => {
      const response = await markUserInvitationAsUnread({
        invitation_id: invitationId,
      });
      return response.success;
    },
    onSuccess: (data, { invitationId }) => {
      if (data) {
        QueryData.updateUserInvitation(invitationId, (invitation) => ({
          ...invitation,
          is_read: false,
        }));
        ToastManager.Success.MarkInvitationAsUnread();
      }
    },
  });
};

export default useMarkInvitationAsUnread;
