'use client';

import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

import { StoreName } from '@/_constants/store';
import { Nilable, Nullable, Undefinable } from '@/_types/common';

interface IStateData {
  accessToken: Nullable<string>;
  refreshTokenId: Nullable<string>;
  isHydrated: boolean;
}

interface IState extends IStateData {
  setAccessToken: (accessToken: Nullable<string>) => void;
  setRefreshTokenId: (refreshTokenId: Nullable<string>) => void;
  setIsHydrated: (isHydrated: boolean) => void;
}

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext =
  createContext<Undefinable<GlobalStoreApi>>(undefined);

export const initializeGlobalStore = (): IStateData => ({
  accessToken: null,
  refreshTokenId: null,
  isHydrated: false,
});

const defaultIStateData: IStateData = {
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

export const createGlobalStore = (
  stateData: IStateData = defaultIStateData,
) => {
  return createStore<IState>()(
    persist(
      (set) => ({
        ...stateData,
        setAccessToken: (accessToken: Nullable<string>) => {
          set(() => ({ accessToken }));
        },
        setRefreshTokenId: (refreshTokenId: Nullable<string>) => {
          set(() => ({ refreshTokenId }));
        },
        setIsHydrated: (isHydrated: boolean) => {
          set(() => ({ isHydrated }));
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
};

const useGlobalStore = <T extends IState = IState>(
  selector: (store: IState) => T = (store) => store as T,
) => {
  const globalStoreContext = useContext(GlobalStoreContext);
  if (!globalStoreContext) {
    throw new Error('useGlobalStore must be used within GlobalStoreProvider');
  }

  return useStore(globalStoreContext, selector);
};

export default useGlobalStore;
