import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import { markUserInvitationAsRead } from '@/services/invitation';
import { ToastManager } from '@/utils/toast';

const useMarkInvitationAsRead = () => {
  return useMutation({
    mutationKey: [MutationKey.MarkInvitationAsRead],
    mutationFn: async ({ invitationId }: { invitationId: string }) => {
      const response = await markUserInvitationAsRead({
        invitation_id: invitationId,
      });
      return response.success;
    },
    onSuccess: (data, { invitationId }) => {
      if (data) {
        QueryData.updateUserInvitation(invitationId, (invitation) => ({
          ...invitation,
          is_read: true,
        }));
        ToastManager.Success.MarkInvitationAsRead();
      }
    },
  });
};

export default useMarkInvitationAsRead;
