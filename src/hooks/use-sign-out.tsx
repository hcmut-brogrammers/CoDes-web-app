import { useMutation } from '@tanstack/react-query';

import { MutationKey } from '@/constants/query-client';
import useAuthStore from '@/stores/auth-store';
import useGlobalStore from '@/stores/global-store';

const useSignOut = () => {
  return useMutation({
    mutationKey: [MutationKey.SignOut],
    mutationFn: async () => {
      const { resetStore: resetGlobalStore } = useGlobalStore.getState();
      const { resetStore: resetAuthStore } = useAuthStore.getState();
      resetGlobalStore();
      resetAuthStore();
    },
  });
};

export default useSignOut;
