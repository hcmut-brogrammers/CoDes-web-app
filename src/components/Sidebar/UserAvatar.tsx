import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { Labels } from '@/assets';
import { useCreateStyles } from '@/hooks/use-app-style';
import useSignOut from '@/hooks/use-sign-out';
import useAuthStore from '@/stores/auth-store';
import { AppStylesVariable } from '@/styles/app-style-variable';
import { FunctionCreateStyles } from '@/types/style';

import Row from '../ui/Row';

const UserAvatar: FC = () => {
  const { mutate: signOut } = useSignOut();
  const styles = useCreateStyles(createStyles);
  const { tokenData } = useAuthStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const username = tokenData.username;
  const firstLetter = username.charAt(0).toUpperCase();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  return (
    <>
      <Row onClick={handleClick} sx={styles.container}>
        <Box sx={styles.avatar}>{firstLetter}</Box>
        <Typography>{username}</Typography>
      </Row>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ width: '100%' }}
      >
        <MenuItem onClick={handleSignOut}>{Labels.Actions.SignOut}</MenuItem>
      </Menu>
    </>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    container: {
      cursor: 'pointer',
      gap: '12px',
      padding: '8px',
      borderRadius: AppStylesVariable.borderRadius.medium,
      color: theme.palette.black,
      border: 'none',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: theme.palette.hover,
      },
    },
    avatar: {
      color: theme.palette.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      height: '30px',
      width: '30px',
      backgroundColor: theme.palette.primary.main,
    },
  };
};

export default UserAvatar;
