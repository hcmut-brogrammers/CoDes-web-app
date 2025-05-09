import { FC } from 'react';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';

interface IProps extends ListItemButtonProps {}
export type StyledListItemButtonProps = IProps;
const StyledListItemButton: FC<IProps> = ({ children, ...props }) => {
  return <ListItemButton {...props}>{children}</ListItemButton>;
};

export default StyledListItemButton;
