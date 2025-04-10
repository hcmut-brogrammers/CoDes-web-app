'use client';
import { FC, PropsWithChildren, useRef } from 'react';

import {
  createGlobalStore,
  GlobalStoreApi,
  GlobalStoreContext,
  initializeGlobalStore,
} from '@/_stores/global-store';

const GlobalStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<Nullable<GlobalStoreApi>>(null);
  if (!storeRef.current) {
    storeRef.current = createGlobalStore(initializeGlobalStore());
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export default GlobalStoreProvider;
