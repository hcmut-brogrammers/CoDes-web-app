import { FC } from 'react';

import { mergeSx } from '@/styles/helper';

import StyledListItemIcon, {
  StyledListItemIconProps,
} from '../ui/StyledListItemIcon';

const SidebarListItemIcon: FC<
  StyledListItemIconProps & {
    open: boolean;
  }
> = ({ open, children, ...props }) => {
  return (
    <StyledListItemIcon
      {...props}
      sx={mergeSx(
        { minWidth: 0, justifyContent: 'center' },
        open ? { marginRight: '8px' } : { marginRight: 'auto' },
        props?.sx,
      )}
    >
      {children}
    </StyledListItemIcon>
  );
};

export default SidebarListItemIcon;
