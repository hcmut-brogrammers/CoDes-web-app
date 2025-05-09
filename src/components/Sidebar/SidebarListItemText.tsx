import { FC } from 'react';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';

import { mergeSx } from '@/styles/helper';

const SidebarListItemText: FC<
  ListItemTextProps & {
    open: boolean;
  }
> = ({ open, ...props }) => {
  return (
    <ListItemText
      {...props}
      disableTypography
      sx={mergeSx(
        open ? { opacity: 1 } : { opacity: 0, display: 'none' },
        props?.sx,
      )}
    />
  );
};

export default SidebarListItemText;
