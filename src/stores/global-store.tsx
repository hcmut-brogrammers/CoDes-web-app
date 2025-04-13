import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StoreName } from '@/constants/store';
import { Nullable } from '@/types/common';

interface IStateData {
  accessToken: Nullable<string>;
  refreshTokenId: Nullable<string>;
}

interface IState extends IStateData {
  setAccessToken: (accessToken: Nullable<string>) => void;
  setRefreshTokenId: (refreshTokenId: Nullable<string>) => void;
  checkIfIsAuthenticated: () => boolean;
}

export const initializeGlobalStore = (): IStateData => ({
  accessToken: null,
  refreshTokenId: null,
});

const defaultStateData: IStateData = {
  accessToken: null,
  refreshTokenId: null,
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
    },
  ),
);

export default useGlobalStore;
