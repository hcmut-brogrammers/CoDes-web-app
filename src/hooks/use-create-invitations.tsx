import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import { createInvitations } from '@/services/invitation';
import { ToastManager } from '@/utils/toast';

const useCreateInvitations = () => {
  return useMutation({
    mutationKey: [MutationKey.CreateInvitations],
    mutationFn: async ({
      userIds,
    }: {
      userIds: string[];
      emails: string[];
    }) => {
      const response = await createInvitations({ user_ids: userIds });
      return response.invitations || [];
    },
    onSuccess: (_, { emails }) => {
      ToastManager.Success.CreateInvitations(emails);
    },
  });
};

export default useCreateInvitations;
