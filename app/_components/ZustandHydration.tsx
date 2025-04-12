'use client';

import { FC, PropsWithChildren } from 'react';

import useGlobalStore from '@/_stores/global-store';

const ZustandHydration: FC<PropsWithChildren> = ({ children }) => {
  const { isHydrated } = useGlobalStore();

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
};

export default ZustandHydration;
