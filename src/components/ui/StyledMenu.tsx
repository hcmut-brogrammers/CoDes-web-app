import { FC } from 'react';
import { MenuListProps } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

import {
  useCreateConditionalStyles,
  useCreateStyles,
} from '@/hooks/use-app-style';
import { AppStyleVariable } from '@/styles';
import { mergeSx } from '@/styles/helper';
import {
  FunctionCreateConditionalStyle,
  FunctionCreateStyles,
} from '@/types/style';

interface IProps extends MenuProps {}
export type StyledMenuProps = IProps;
const StyledMenu: FC<IProps> = ({ children, slotProps, ...props }) => {
  const styles = useCreateStyles(createStyles);
  return (
    <Menu
      {...props}
      slotProps={{
        ...slotProps,
        list: {
          ...slotProps?.list,
          sx: mergeSx(styles.menuList, (slotProps?.list as MenuListProps)?.sx),
        },
      }}
    >
      {children}
    </Menu>
  );
};

interface IMenuItemProps extends MenuItemProps {
  isSelected?: boolean;
}
export const StyledMenuItem: FC<IMenuItemProps> = ({
  sx,
  children,
  isSelected = false,
  ...props
}) => {
  const conditionalStyles = useCreateConditionalStyles(createConditionalStyles);
  return (
    <MenuItem
      {...props}
      sx={mergeSx(conditionalStyles.menuItem({ isSelected }), sx)}
    >
      {children}
    </MenuItem>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    menuList: {
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
  };
};

const createConditionalStyles: FunctionCreateConditionalStyle = (theme) => {
  return {
    menuItem: ({ isSelected }) => ({
      width: '100%',
      flexWrap: 'wrap',
      padding: '8px',
      gap: '8px',
      borderRadius: AppStyleVariable.borderRadius.medium,
      ...(isSelected && {
        backgroundColor: theme.palette.selected,
        '&:hover': {
          backgroundColor: theme.palette.selected,
        },
      }),
    }),
  };
};

export default StyledMenu;
