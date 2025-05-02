import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { MenuItemProps } from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { Labels } from '@/assets';
import { AppRoute } from '@/constants/app-routes';
import { useCreateStyles } from '@/hooks/use-app-style';
import useFetchOrganizations from '@/hooks/use-fetch-organizations';
import useMenu from '@/hooks/use-menu';
import useModal from '@/hooks/use-modal';
import useSwitchOrganization from '@/hooks/use-switch-organization';
import useGlobalStore from '@/stores/global-store';
import { AppStyleVariable } from '@/styles';
import { IOrganization } from '@/types/organization';
import { FunctionCreateStyles } from '@/types/style';

import {
  AddRoundedIcon,
  ApartmentRoundedIcon,
  ExpandLessRoundedIcon,
  ExpandMoreRoundedIcon,
} from '../ui/Icons';
import StyledMenu, { StyledMenuItem } from '../ui/StyledMenu';

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
  const { anchorEl, handleOpenMenu, handleCloseMenu, menuOpen } = useMenu();
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
      <StyledMenu anchorEl={anchorEl} open={menuOpen} onClose={handleCloseMenu}>
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
      </StyledMenu>
      <CreateOrganizationModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

const CreateOrganizationMenuItem: FC<MenuItemProps> = ({ ...props }) => {
  return (
    <StyledMenuItem {...props}>
      <AddRoundedIcon />
      <Typography>{Labels.Actions.CreateOrganization}</Typography>
    </StyledMenuItem>
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
  const firstLetter = organization.name.charAt(0).toUpperCase();
  const isDefault = organization.is_default;
  const label = isDefault
    ? `${organization.name} (Default)`
    : organization.name;

  return (
    <StyledMenuItem
      {...props}
      isSelected={isSelected}
      onClick={() => onClick(organization.id)}
    >
      <Box sx={styles.organizationAvatar}>{firstLetter}</Box>
      <Typography>{label}</Typography>
    </StyledMenuItem>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
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

export default OrganizationSelect;
