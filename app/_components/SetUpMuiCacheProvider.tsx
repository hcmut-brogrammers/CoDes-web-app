import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import theme from '@/_styles/theme';

const CSS_KEY = 'codes-mui';
const MuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ key: CSS_KEY }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default MuiThemeProvider;
