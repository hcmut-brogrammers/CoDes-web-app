import { FC, PropsWithChildren } from 'react';

import SetUpMuiThemeProvider from './SetUpMuiThemeProvider';
import SetUpQueryClientProvider from './SetUpQueryClientProvider';

const SetUpProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SetUpQueryClientProvider>
      <SetUpMuiThemeProvider>{children}</SetUpMuiThemeProvider>
    </SetUpQueryClientProvider>
  );
};

export default SetUpProviders;
