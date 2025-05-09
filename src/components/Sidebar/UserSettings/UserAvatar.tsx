import { FC, useState } from 'react';

import { Labels } from '@/assets';
import StyledMenu, { StyledMenuItem } from '@/components/ui/StyledMenu';
import useSignOut from '@/hooks/use-sign-out';
import useAuthStore from '@/stores/auth-store';

import SidebarListItem from '../SidebarListItem';
import SidebarListItemButton from '../SidebarListItemButton';
import SidebarListItemIcon from '../SidebarListItemIcon';
import SidebarListItemText from '../SidebarListItemText';

import MyUserIcon from './MyUserIcon';

interface IProps {
  open: boolean;
}

const UserSettings: FC<IProps> = ({ open }) => {
  const { mutateAsync: signOutAsync } = useSignOut();
  const { tokenData } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);
  const username = tokenData.username;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    await signOutAsync();
    handleClose();
  };

  return (
    <>
      <SidebarListItem>
        <SidebarListItemButton
          onClick={handleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SidebarListItemIcon open={open}>
            <MyUserIcon />
          </SidebarListItemIcon>
          <SidebarListItemText open={open} primary={username} />
        </SidebarListItemButton>
      </SidebarListItem>
      <StyledMenu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <StyledMenuItem onClick={handleSignOut}>
          {Labels.Actions.SignOut}
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};

export default UserSettings;
