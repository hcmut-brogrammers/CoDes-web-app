import { FC } from 'react';

import { Labels } from '@/assets';
import { ApartmentRoundedIcon } from '@/components/ui/Icons';
import { AppRoute } from '@/constants/app-routes';
import useNavigateRoute from '@/hooks/use-navigate-route';

import SidebarListItem from '../SidebarListItem';
import SidebarListItemButton from '../SidebarListItemButton';
import SidebarListItemIcon from '../SidebarListItemIcon';
import SidebarListItemText from '../SidebarListItemText';

interface IProps {
  open: boolean;
}

const OrganizationInfo: FC<IProps> = ({ open }) => {
  const { navigateOrganizationInfo } = useNavigateRoute();
  const handleClick = () => {
    navigateOrganizationInfo();
  };

  return (
    <SidebarListItem pathname={AppRoute.OrganizationInfo()}>
      <SidebarListItemButton onClick={handleClick}>
        <SidebarListItemIcon open={open}>
          <ApartmentRoundedIcon />
        </SidebarListItemIcon>
        <SidebarListItemText
          open={open}
          primary={Labels.Sidebar.OrganizationManagementSection.Settings}
        />
      </SidebarListItemButton>
    </SidebarListItem>
  );
};

export default OrganizationInfo;
