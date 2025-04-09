'use client';

import React, { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from '@/_query-data/query-client';

const ReactQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
