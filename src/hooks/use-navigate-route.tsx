import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@/constants/app-routes';
import useGlobalStore from '@/stores/global-store';

const useNavigateRoute = () => {
  const { setCurrentDesignProjectId } = useGlobalStore();
  const navigate = useNavigate();

  const navigateDesignProjectCanvas = useCallback(
    (designProjectId: string) => {
      setCurrentDesignProjectId(designProjectId);
      const url = AppRoute.DesignProjectCanvas(designProjectId);
      navigate(url);
    },
    [setCurrentDesignProjectId, navigate],
  );

  const navigateDesignProjects = useCallback(() => {
    navigate(AppRoute.DesignProjects());
  }, [navigate]);

  const navigateMembersInfo = useCallback(() => {
    navigate(AppRoute.MembersInfo());
  }, [navigate]);

  const navigateOrganizationInfo = useCallback(() => {
    navigate(AppRoute.OrganizationInfo());
  }, [navigate]);

  return {
    navigateDesignProjectCanvas,
    navigateDesignProjects,
    navigateMembersInfo,
    navigateOrganizationInfo,
  };
};

export default useNavigateRoute;
