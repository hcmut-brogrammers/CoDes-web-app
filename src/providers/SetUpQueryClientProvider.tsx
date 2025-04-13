import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from '@/query-data/query-client';

const SetUpQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default SetUpQueryClientProvider;
