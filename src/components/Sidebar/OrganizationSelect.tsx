import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { Labels } from '@/assets';
import { AppRoute } from '@/constants/app-routes';
import {
  useCreateConditionalStyles,
  useCreateStyles,
} from '@/hooks/use-app-style';
import useFetchOrganizations from '@/hooks/use-fetch-organizations';
import useModal from '@/hooks/use-modal';
import useSwitchOrganization from '@/hooks/use-switch-organization';
import useGlobalStore from '@/stores/global-store';
import { AppStyleVariable } from '@/styles';
import { IOrganization } from '@/types/organization';
import {
  FunctionCreateConditionalStyle,
  FunctionCreateStyles,
} from '@/types/style';

import {
  AddRoundedIcon,
  ApartmentRoundedIcon,
  ExpandLessRoundedIcon,
  ExpandMoreRoundedIcon,
} from '../ui/Icons';

import CreateOrganizationModal from './CreateOrganizationModal';

const OrganizationSelect: FC = () => {
  const navigate = useNavigate();
  const styles = useCreateStyles(createStyles);
  const { currentOrganizationId } = useGlobalStore();
  const { data: organizationsData, isFetched: isOrganizationsDataFetched } =
    useFetchOrganizations();
  const { mutateAsync: switchOrganizationAsync } = useSwitchOrganization();

  const {
    open: modalOpen,
    handleOpen: handleOpenModal,
    handleClose: handleCloseModal,
  } = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleChangeOrganization = async (organizationId: string) => {
    await switchOrganizationAsync({ organization_id: organizationId });
    handleCloseMenu();
    navigate(AppRoute.Organization(organizationId));
  };

  if (!organizationsData || !isOrganizationsDataFetched) {
    return <Skeleton variant="rectangular" animation="wave" height={40} />;
  }

  const currentOrganization = organizationsData.find(
    (organization) => organization.id === currentOrganizationId,
  );
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ApartmentRoundedIcon />}
        endIcon={
          menuOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />
        }
        onClick={handleOpenMenu}
        sx={styles.button}
      >
        {currentOrganization?.name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        slotProps={{
          list: {
            sx: styles.menuList,
          },
        }}
      >
        {organizationsData.map((organization) => (
          <OrganizationMenuItem
            key={organization.id}
            organization={organization}
            isSelected={organization.id === currentOrganizationId}
            onClick={handleChangeOrganization}
          />
        ))}
        <Divider />
        <CreateOrganizationMenuItem
          onClick={() => {
            handleCloseMenu();
            handleOpenModal();
          }}
        />
      </Menu>
      <CreateOrganizationModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

const CreateOrganizationMenuItem: FC<MenuItemProps> = ({ ...props }) => {
  const conditionalStyles = useCreateConditionalStyles(createConditionalStyles);
  return (
    <MenuItem {...props} sx={conditionalStyles.menuItem({ isSelected: false })}>
      <AddRoundedIcon />
      <Typography>{Labels.Actions.CreateOrganization}</Typography>
    </MenuItem>
  );
};

const OrganizationMenuItem: FC<
  Omit<MenuItemProps, 'onClick'> & {
    organization: IOrganization;
    isSelected: boolean;
    onClick: (organizationId: string) => void;
  }
> = ({ organization, isSelected, onClick, ...props }) => {
  const styles = useCreateStyles(createStyles);
  const conditionalStyles = useCreateConditionalStyles(createConditionalStyles);
  const firstLetter = organization.name.charAt(0).toUpperCase();
  const isDefault = organization.is_default;
  const label = isDefault
    ? `${organization.name} (Default)`
    : organization.name;

  return (
    <MenuItem
      {...props}
      onClick={() => onClick(organization.id)}
      sx={conditionalStyles.menuItem({ isSelected })}
    >
      <Box sx={styles.organizationAvatar}>{firstLetter}</Box>
      <Typography>{label}</Typography>
    </MenuItem>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    menuList: {
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    button: {
      border: 'none',
      color: theme.palette.black,
    },
    organizationAvatar: {
      width: '24px',
      height: '24px',
      borderRadius: AppStyleVariable.borderRadius.medium,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
};

const createConditionalStyles: FunctionCreateConditionalStyle = (theme) => {
  return {
    menuItem: ({ isSelected }) => ({
      width: '250px',
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

export default OrganizationSelect;
