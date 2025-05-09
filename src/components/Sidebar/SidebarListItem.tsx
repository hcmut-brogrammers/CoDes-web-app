import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useCreateConditionalStyles } from '@/hooks/use-app-style';
import { FunctionCreateConditionalStyles } from '@/types/style';

import StyledListItem, { StyledListItemProps } from '../ui/StyledListItem';

const SidebarListItem: FC<
  StyledListItemProps & {
    pathname?: string;
  }
> = ({ pathname, children, ...props }) => {
  const location = useLocation();
  const conditionalStyles = useCreateConditionalStyles(createConditionalStyles);

  const isActive = location.pathname === pathname;

  return (
    <StyledListItem
      disablePadding
      {...props}
      sx={conditionalStyles.listItem({ isActive })}
    >
      {children}
    </StyledListItem>
  );
};

const createConditionalStyles: FunctionCreateConditionalStyles = (theme) => {
  return {
    listItem: ({ isActive }) => ({
      ...(isActive
        ? {
            backgroundColor: theme.palette.active,
          }
        : {}),
    }),
  };
};

export default SidebarListItem;
