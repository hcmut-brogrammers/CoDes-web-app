import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from '@/query-data/query-client';

const SetUpQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default SetUpQueryClientProvider;
