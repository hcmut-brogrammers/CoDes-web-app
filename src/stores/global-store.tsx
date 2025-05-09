import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StoreName } from '@/constants/store';

interface IStateData {
  currentOrganizationId: string;
  currentDesignProjectId: string;
}

interface IState extends IStateData {
  setCurrentOrganizationId: (currentOrganizationId: string) => void;
  setCurrentDesignProjectId: (currentDesignProjectId: string) => void;
  resetStore: () => void;
}

const initializeGlobalStore = (): IStateData => ({
  currentOrganizationId: '',
  currentDesignProjectId: '',
});

const defaultStateData: IStateData = initializeGlobalStore();

const useGlobalStore = create<IState>()(
  persist(
    (set) => ({
      ...defaultStateData,
      setCurrentOrganizationId: (currentOrganizationId) => {
        set(() => ({ currentOrganizationId }));
      },
      setCurrentDesignProjectId: (currentDesignProjectId) => {
        set(() => ({ currentDesignProjectId }));
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
