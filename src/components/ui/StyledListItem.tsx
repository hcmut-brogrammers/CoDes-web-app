import { FC } from 'react';
import ListItem, { ListItemProps } from '@mui/material/ListItem';

interface IProps extends ListItemProps {}
export type StyledListItemProps = IProps;
const StyledListItem: FC<IProps> = ({ children, ...props }) => {
  return <ListItem {...props}>{children}</ListItem>;
};

export default StyledListItem;
