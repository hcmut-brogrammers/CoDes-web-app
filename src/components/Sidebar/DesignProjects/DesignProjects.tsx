import { FC } from 'react';

import { Labels } from '@/assets';
import { BrushRoundedIcon } from '@/components/ui/Icons';
import { AppRoute } from '@/constants/app-routes';
import useNavigateRoute from '@/hooks/use-navigate-route';

import SidebarListItem from '../SidebarListItem';
import SidebarListItemButton from '../SidebarListItemButton';
import SidebarListItemIcon from '../SidebarListItemIcon';
import SidebarListItemText from '../SidebarListItemText';

interface IProps {
  open: boolean;
}

const DesignProjects: FC<IProps> = ({ open }) => {
  const { navigateDesignProjects } = useNavigateRoute();
  const handleClick = () => {
    navigateDesignProjects();
  };
  return (
    <SidebarListItem pathname={AppRoute.DesignProjects()}>
      <SidebarListItemButton onClick={handleClick}>
        <SidebarListItemIcon open={open}>
          <BrushRoundedIcon />
        </SidebarListItemIcon>
        <SidebarListItemText
          open={open}
          primary={Labels.Sidebar.DesignProjectsSection.DesignProjects}
        />
      </SidebarListItemButton>
    </SidebarListItem>
  );
};

export default DesignProjects;
