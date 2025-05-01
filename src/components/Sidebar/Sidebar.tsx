import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { SxProps } from '@mui/material/styles';

import { Labels } from '@/assets';
import { AppRoute } from '@/constants/app-routes';
import { useCreateStyles } from '@/hooks/use-app-style';
import useGlobalStore from '@/stores/global-store';
import { FunctionCreateStyles } from '@/types/style';

import Column from '../ui/Column';
import { ApartmentRoundedIcon, GroupRoundedIcon } from '../ui/Icons';

import OrganizationSelect from './OrganizationSelect';
import UserAvatar from './UserAvatar';

const Sidebar: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Column sx={styles.container}>
      <OrganizationSection />
      <Box sx={{ flex: 1 }}></Box>
      <MenuList>
        <MembersInfo />
        <OrganizationInfo />
      </MenuList>
      <UserSection />
    </Column>
  );
};

const OrganizationSection: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Column sx={styles.organizationSection}>
      <OrganizationSelect />
    </Column>
  );
};

const UserSection: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Column sx={styles.userAvatarContainer}>
      <UserAvatar />
    </Column>
  );
};

const MembersInfo: FC = () => {
  const { currentOrganizationId } = useGlobalStore();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(AppRoute.MembersInfo(currentOrganizationId));
  };
  return (
    <StyledMenuItem onClick={handleClick}>
      <GroupRoundedIcon />
      <Typography>{Labels.Sidebar.MembersInfo}</Typography>
    </StyledMenuItem>
  );
};

const OrganizationInfo: FC = () => {
  const { currentOrganizationId } = useGlobalStore();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(AppRoute.OrganizationInfo(currentOrganizationId));
  };

  return (
    <StyledMenuItem onClick={handleClick}>
      <ApartmentRoundedIcon />
      <Typography>{Labels.Sidebar.OrganizationInfo}</Typography>
    </StyledMenuItem>
  );
};

const StyledMenuItem: FC<MenuItemProps> = ({ ...props }) => {
  const styles = useCreateStyles(createStyles);
  return <MenuItem {...props} sx={styles.menuItem}></MenuItem>;
};

const createStyles: FunctionCreateStyles = (theme) => {
  const border = `1px solid ${theme.palette.border}`;
  const sectionStyles: SxProps = {
    padding: '8px',
  };
  return {
    container: {
      border,
      height: '100%',
      width: '250px',
    },
    organizationSection: {
      ...sectionStyles,
      alignItems: 'flex-start',
      width: '100%',
      borderBottom: border,
    },
    userAvatarContainer: {
      ...sectionStyles,
      borderTop: border,
    },

    menuItem: {
      padding: '8px',
      gap: '8px',
    },
  };
};

export default Sidebar;
