import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StoreName } from '@/constants/store';
import { ITokenData } from '@/types/authentication';
import { UserRole } from '@/types/user';

interface IStateData {
  accessToken: string;
  refreshTokenId: string;
  tokenData: ITokenData;
}

interface IState extends IStateData {
  setAccessToken: (accessToken: string) => void;
  setRefreshTokenId: (refreshTokenId: string) => void;
  setTokenData: (tokenData: ITokenData) => void;
  checkIfIsAuthenticated: () => boolean;
}

export const initializeGlobalStore = (): IStateData => ({
  accessToken: '',
  refreshTokenId: '',
  tokenData: {
    email: '',
    exp: 0,
    role: UserRole.OrganizationAdmin,
    sub: '',
    user_id: '',
    username: '',
  },
});

const defaultStateData: IStateData = initializeGlobalStore();

const useGlobalStore = create<IState>()(
  persist(
    (set, get) => ({
      ...defaultStateData,
      setAccessToken: (accessToken) => {
        set(() => ({ accessToken }));
      },
      setRefreshTokenId: (refreshTokenId) => {
        set(() => ({ refreshTokenId }));
      },
      setTokenData: (tokenData) => {
        set(() => ({ tokenData }));
      },
      checkIfIsAuthenticated: () => {
        const { accessToken, refreshTokenId } = get();
        return !!accessToken && !!refreshTokenId;
      },
    }),
    {
      name: StoreName.GlobalStore,
      partialize: ({ accessToken, refreshTokenId, tokenData }) => ({
        accessToken,
        refreshTokenId,
        tokenData,
      }),
    },
  ),
);

export default useGlobalStore;
