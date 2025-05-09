import { FC } from 'react';

import { Labels } from '@/assets';
import { GroupRoundedIcon } from '@/components/ui/Icons';
import { AppRoute } from '@/constants/app-routes';
import useNavigateRoute from '@/hooks/use-navigate-route';

import SidebarListItem from '../SidebarListItem';
import SidebarListItemButton from '../SidebarListItemButton';
import SidebarListItemIcon from '../SidebarListItemIcon';
import SidebarListItemText from '../SidebarListItemText';

interface IProps {
  open: boolean;
}

const MembersInfo: FC<IProps> = ({ open }) => {
  const { navigateMembersInfo } = useNavigateRoute();
  const handleClick = () => {
    navigateMembersInfo();
  };
  return (
    <SidebarListItem pathname={AppRoute.MembersInfo()}>
      <SidebarListItemButton onClick={handleClick}>
        <SidebarListItemIcon open={open}>
          <GroupRoundedIcon />
        </SidebarListItemIcon>
        <SidebarListItemText
          open={open}
          primary={Labels.Sidebar.OrganizationManagementSection.Members}
        />
      </SidebarListItemButton>
    </SidebarListItem>
  );
};

export default MembersInfo;
