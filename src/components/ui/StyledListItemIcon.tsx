import { FC } from 'react';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';

interface IProps extends ListItemIconProps {}
export type StyledListItemIconProps = IProps;
const StyledListItemIcon: FC<IProps> = ({ children, ...props }) => {
  return <ListItemIcon {...props}>{children}</ListItemIcon>;
};

export default StyledListItemIcon;
