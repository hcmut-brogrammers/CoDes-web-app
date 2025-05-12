import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import { AppStyleVariable } from '@/styles';
import { CommonSelector } from '@/styles/app-style-variable';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  ...AppStyleVariable.transition.open({ theme, props: ['width'] }),
  width: drawerWidth,
  overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
  ...AppStyleVariable.transition.close({ theme, props: ['width'] }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        [CommonSelector.Paper]: openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        [CommonSelector.Paper]: closedMixin(theme),
      },
    },
  ],
}));

export default SidebarDrawer;
