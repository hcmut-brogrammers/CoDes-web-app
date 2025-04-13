import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

import { StoreName } from '@/constants/store';
import { Nilable, Nullable } from '@/types/common';

interface IStateData {
  accessToken: Nullable<string>;
  refreshTokenId: Nullable<string>;
  isHydrated: boolean;
}

interface IState extends IStateData {
  setAccessToken: (accessToken: Nullable<string>) => void;
  setRefreshTokenId: (refreshTokenId: Nullable<string>) => void;
  setIsHydrated: (isHydrated: boolean) => void;
  checkIfIsAuthenticated: () => boolean;
}

export const initializeGlobalStore = (): IStateData => ({
  accessToken: null,
  refreshTokenId: null,
  isHydrated: false,
});

const defaultStateData: IStateData = {
  accessToken: null,
  refreshTokenId: null,
  isHydrated: false,
};

const onRehydrateStorage: PersistOptions<
  IState,
  IState
>['onRehydrateStorage'] = (state) => {
  return (rehydratedState: Nilable<IState>, error) => {
    if (rehydratedState) {
      state.setIsHydrated(true);
    } else {
      console.error('Error rehydrating state:', error);
      state.setIsHydrated(false);
    }
  };
};

const useGlobalStore = create<IState>()(
  persist(
    (set, get) => ({
      ...defaultStateData,
      setAccessToken: (accessToken: Nullable<string>) => {
        set(() => ({ accessToken }));
      },
      setRefreshTokenId: (refreshTokenId: Nullable<string>) => {
        set(() => ({ refreshTokenId }));
      },
      setIsHydrated: (isHydrated: boolean) => {
        set(() => ({ isHydrated }));
      },
      checkIfIsAuthenticated: () => {
        const { accessToken, refreshTokenId } = get();
        return !!accessToken && !!refreshTokenId;
      },
    }),
    {
      name: StoreName.GlobalStore,
      partialize: ({ accessToken, refreshTokenId }) => ({
        accessToken,
        refreshTokenId,
      }),
      onRehydrateStorage,
    },
  ),
);

export default useGlobalStore;
