import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material';

import theme from '@/styles/app-theme';

const SetUpMuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default SetUpMuiThemeProvider;
