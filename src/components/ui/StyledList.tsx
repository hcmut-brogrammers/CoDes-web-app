import { FC } from 'react';
import List, { ListProps } from '@mui/material/List';

interface IProps extends ListProps {}
const StyledList: FC<IProps> = ({ children, ...props }) => {
  return <List {...props}>{children}</List>;
};

export default StyledList;
