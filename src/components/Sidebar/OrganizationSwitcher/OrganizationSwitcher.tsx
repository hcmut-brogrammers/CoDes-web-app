import { FC } from 'react';
import Divider from '@mui/material/Divider';
import { MenuItemProps } from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { Labels } from '@/assets';
import useFetchOrganizations from '@/hooks/use-fetch-organizations';
import useMenu from '@/hooks/use-menu';
import useModal from '@/hooks/use-modal';
import useSwitchOrganization from '@/hooks/use-switch-organization';
import useAuthStore from '@/stores/auth-store';
import useGlobalStore from '@/stores/global-store';
import { IOrganization } from '@/types/organization';

import { AddRoundedIcon } from '../../ui/Icons';
import StyledMenu, { StyledMenuItem } from '../../ui/StyledMenu';
import CreateOrganizationModal from '../CreateOrganizationModal';
import SidebarListItem from '../SidebarListItem';
import SidebarListItemButton from '../SidebarListItemButton';
import SidebarListItemIcon from '../SidebarListItemIcon';
import SidebarListItemText from '../SidebarListItemText';

import OrganizationIcon from './OrganizationIcon';

interface IProps {
  open: boolean;
}
const OrganizationSwitcher: FC<IProps> = ({ open }) => {
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
    handleCloseMenu();
    await switchOrganizationAsync({ organization_id: organizationId });
  };

  if (!organizationsData || !isOrganizationsDataFetched) {
    return <Skeleton variant="rectangular" animation="wave" height={40} />;
  }

  const currentOrganization = organizationsData.find(
    (organization) => organization.id === currentOrganizationId,
  );

  if (!currentOrganization) {
    return null;
  }

  return (
    <>
      <SidebarListItem>
        <SidebarListItemButton onClick={handleOpenMenu}>
          <SidebarListItemIcon open={open}>
            <OrganizationIcon
              organizationId={currentOrganization.id}
              organizationName={currentOrganization.name}
            />
          </SidebarListItemIcon>
          <SidebarListItemText open={open} primary={currentOrganization.name} />
        </SidebarListItemButton>
      </SidebarListItem>
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
  const { tokenData } = useAuthStore();
  const isInvited = tokenData?.user_id !== organization.owner_id;
  const isDefault = organization.is_default;
  const label = isInvited
    ? `${organization.name} (Invited)`
    : isDefault
    ? `${organization.name} (Default)`
    : organization.name;

  return (
    <StyledMenuItem
      {...props}
      isSelected={isSelected}
      onClick={() => onClick(organization.id)}
    >
      <OrganizationIcon
        organizationId={organization.id}
        organizationName={organization.name}
      />
      <Typography>{label}</Typography>
    </StyledMenuItem>
  );
};

export default OrganizationSwitcher;
