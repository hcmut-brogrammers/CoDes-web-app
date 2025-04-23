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

export const initializeAuthStore = (): IStateData => ({
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

const defaultStateData: IStateData = initializeAuthStore();

const useAuthStore = create<IState>()(
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
      name: StoreName.AuthStore,
      partialize: ({ accessToken, refreshTokenId, tokenData }) => ({
        accessToken,
        refreshTokenId,
        tokenData,
      }),
    },
  ),
);

export default useAuthStore;
