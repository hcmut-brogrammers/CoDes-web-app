import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StoreName } from '@/constants/store';

interface IStateData {
  currentOrganizationId: string;
}

interface IState extends IStateData {
  setCurrentOrganizationId: (currentOrganizationId: string) => void;
  resetStore: () => void;
}

const initializeGlobalStore = (): IStateData => ({
  currentOrganizationId: '',
});

const defaultStateData: IStateData = initializeGlobalStore();

const useGlobalStore = create<IState>()(
  persist(
    (set) => ({
      ...defaultStateData,
      setCurrentOrganizationId: (currentOrganizationId) => {
        set(() => ({ currentOrganizationId }));
      },
      resetStore: () => {
        set(() => ({ ...defaultStateData }));
      },
    }),
    {
      name: StoreName.GlobalStore,
    },
  ),
);

export default useGlobalStore;
