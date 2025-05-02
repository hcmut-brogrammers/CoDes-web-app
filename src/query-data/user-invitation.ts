import { QueryKey } from '@/constants/query-client';
import useAuthStore from '@/stores/auth-store';
import { IUserInvitation } from '@/types/invitation';

import queryClient from './query-client';

export const UserInvitationQuery = {
  getUserInvitations: () => {
    const { tokenData } = useAuthStore.getState();
    return (
      queryClient.getQueryData<IUserInvitation[]>([
        tokenData.user_id,
        QueryKey.UserInvitations,
      ]) || []
    );
  },
  setUserInvitations: (userInvitations: IUserInvitation[]) => {
    const { tokenData } = useAuthStore.getState();
    return queryClient.setQueryData<IUserInvitation[]>(
      [tokenData.user_id, QueryKey.UserInvitations],
      userInvitations,
    );
  },
  updateUserInvitation: (
    invitationId: string,
    updater: (invitation: IUserInvitation) => IUserInvitation,
  ) => {
    const invitations = UserInvitationQuery.getUserInvitations();
    if (!invitations) return;

    const updatedInvitations = invitations.map((invitation) =>
      invitation.id === invitationId ? updater(invitation) : invitation,
    );
    UserInvitationQuery.setUserInvitations(updatedInvitations);
  },
};
