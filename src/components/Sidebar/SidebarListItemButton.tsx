import { FC } from 'react';

import { mergeSx } from '@/styles/helper';

import StyledListItemButton, {
  StyledListItemButtonProps,
} from '../ui/StyledListItemButton';

const SidebarListItemButton: FC<StyledListItemButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <StyledListItemButton
      {...props}
      sx={mergeSx({ minHeight: '20px', px: 2.5 }, props?.sx)}
    >
      {children}
    </StyledListItemButton>
  );
};

export default SidebarListItemButton;
