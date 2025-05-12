import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';

import { AppStyleVariable } from '@/styles';
import { CommonSelector } from '@/styles/app-style-variable';

const drawerWidth = 260;

interface IMixinParams {
  theme: Theme;
  width: string | number;
}

const openedMixin = ({ theme, width }: IMixinParams): CSSObject => ({
  ...AppStyleVariable.transition.open({ theme, props: ['width'] }),
  width,
  overflowX: 'hidden',
});
const closedMixin = ({ theme, width }: IMixinParams): CSSObject => ({
  ...AppStyleVariable.transition.close({ theme, props: ['width'] }),
  width,
  overflowX: 'hidden',
});

interface IProps extends DrawerProps {
  openedWidth: IMixinParams['width'];
  closedWidth?: IMixinParams['width'];
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) =>
    prop !== 'open' && prop !== 'openedWidth' && prop !== 'closedWidth',
})<IProps>(({ theme, openedWidth, closedWidth = 0 }) => {
  const openedMixinStyles = openedMixin({ theme, width: openedWidth });
  const closedMixinStyles = closedMixin({ theme, width: closedWidth });

  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixinStyles,
          [CommonSelector.Paper]: openedMixinStyles,
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixinStyles,
          [CommonSelector.Paper]: closedMixinStyles,
        },
      },
    ],
  };
});

export default StyledDrawer;
