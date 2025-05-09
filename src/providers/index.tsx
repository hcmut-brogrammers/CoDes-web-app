import { FC, PropsWithChildren } from 'react';

import DesignProjectWebSocketProvider from './DesignProjectWebSocketProvider';
import SetUpMuiThemeProvider from './SetUpMuiThemeProvider';
import SetUpQueryClientProvider from './SetUpQueryClientProvider';

const SetUpProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SetUpQueryClientProvider>
      <SetUpMuiThemeProvider>
        <DesignProjectWebSocketProvider>
          {children}
        </DesignProjectWebSocketProvider>
      </SetUpMuiThemeProvider>
    </SetUpQueryClientProvider>
  );
};

export default SetUpProviders;
