import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '@/constants/query-client';
import { fetchUserInvitations } from '@/services/invitation';
import useAuthStore from '@/stores/auth-store';

const RefetchInterval = 1000 * 30; // 30 seconds
const useFetchUserInvitations = () => {
  const { tokenData } = useAuthStore();
  const enabled = !!tokenData;

  return useQuery({
    queryKey: [tokenData.user_id, QueryKey.UserInvitations],
    queryFn: async () => {
      const response = await fetchUserInvitations();
      const invitations = response.invitations;
      if (!invitations || !Array.isArray(invitations)) return [];

      // sort the invitations by created_at in descending order
      const sortedInvitations = invitations.slice().sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
      return sortedInvitations;
    },
    refetchInterval: RefetchInterval,
    enabled,
  });
};

export default useFetchUserInvitations;
