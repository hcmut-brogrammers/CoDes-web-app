import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';

import { Labels } from '@/assets';

import { ChevronLeftRoundedIcon, ViewSidebarRoundedIcon } from '../ui/Icons';
import StyledList from '../ui/StyledList';

import OrganizationInfo from './OrganizationInfo/OrganizationInfo';
import OrganizationSwitcher from './OrganizationSwitcher/OrganizationSwitcher';
import UserInvitations from './UserInvitations/UserInvitations';
import UserSettings from './UserSettings/UserAvatar';
import DesignProjects from './DesignProjects';
import MembersInfo from './Members';
import SidebarDrawer, { DrawerHeader } from './SidebarDrawer';

const Sidebar: FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const icon = open ? <ChevronLeftRoundedIcon /> : <ViewSidebarRoundedIcon />;

  return (
    <SidebarDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleToggleDrawer}>{icon}</IconButton>
      </DrawerHeader>
      <Divider />
      <StyledList
        subheader={
          open && (
            <ListSubheader component="div">
              {Labels.Sidebar.OrganizationSwitcherSection.Header}
            </ListSubheader>
          )
        }
      >
        <OrganizationSwitcher open={open} />
      </StyledList>
      <Divider />
      <StyledList
        subheader={
          open && (
            <ListSubheader component="div">
              {Labels.Sidebar.DesignProjectsSection.Header}
            </ListSubheader>
          )
        }
      >
        <DesignProjects open={open} />
      </StyledList>
      <Divider />
      <StyledList
        subheader={
          open && (
            <ListSubheader component="div">
              {Labels.Sidebar.OrganizationManagementSection.Header}
            </ListSubheader>
          )
        }
      >
        <MembersInfo open={open} />
        <OrganizationInfo open={open} />
      </StyledList>
      <Divider />
      <StyledList
        subheader={
          open && (
            <ListSubheader component="div">
              {Labels.Sidebar.UserSection.Header}
            </ListSubheader>
          )
        }
      >
        <UserInvitations open={open} />
      </StyledList>
      <Box sx={{ flex: 1 }} />
      <Divider />
      <StyledList>
        <UserSettings open={open} />
      </StyledList>
    </SidebarDrawer>
  );
};

export default Sidebar;
