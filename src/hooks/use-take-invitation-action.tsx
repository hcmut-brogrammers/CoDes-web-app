import { useMutation } from '@tanstack/react-query';

import { InvitationStatus, InviteeAction } from '@/constants/enum';
import { MutationKey } from '@/constants/query-client';
import { QueryData } from '@/query-data';
import {
  ITakeInvitationActionsParams,
  takeInvitationAction,
} from '@/services/invitation';
import { ToastManager } from '@/utils/toast';

import useMarkInvitationAsRead from './use-mark-invitation-read';

interface IVariables extends ITakeInvitationActionsParams {
  organization_name: string;
}

const useTakeInvitationAction = () => {
  const { mutateAsync: markInvitationAsReadAsync } = useMarkInvitationAsRead();

  return useMutation({
    mutationKey: [MutationKey.TakeInvitationAction],
    mutationFn: async ({ invitation_id, action }: IVariables) => {
      return await takeInvitationAction({ invitation_id, action });
    },
    onSuccess: async (_, { organization_name, action, invitation_id }) => {
      await markInvitationAsReadAsync({
        invitation_id,
      });
      QueryData.updateUserInvitation(invitation_id, (invitation) => ({
        ...invitation,
        is_read: true,
        status:
          action === InviteeAction.Accept
            ? InvitationStatus.Accepted
            : InvitationStatus.Rejected,
      }));
      if (action === InviteeAction.Accept) {
        QueryData.invalidateOrganizations();
        ToastManager.Success.JoinOrganization(organization_name);
      }
    },
  });
};

export default useTakeInvitationAction;
