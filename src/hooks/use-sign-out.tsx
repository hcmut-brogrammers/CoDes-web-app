import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import useAuthStore from '@/stores/auth-store';

const useSignOut = () => {
  return useMutation({
    mutationKey: [MutationKey.SignOut],
    mutationFn: async () => {
      const { resetStore } = useAuthStore.getState();
      resetStore();
    },
  });
};

export default useSignOut;
