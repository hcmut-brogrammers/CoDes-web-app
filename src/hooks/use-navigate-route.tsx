import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@/constants/app-routes';
import useGlobalStore from '@/stores/global-store';

const useNavigateRoute = () => {
  const { setCurrentDesignProjectId } = useGlobalStore();
  const navigate = useNavigate();

  const navigateDesignProjectCanvas = useCallback((designProjectId: string) => {
    setCurrentDesignProjectId(designProjectId);
    const url = AppRoute.DesignProjectCanvas(designProjectId);
    navigate(url);
  }, []);

  return {
    navigateDesignProjectCanvas,
  };
};

export default useNavigateRoute;
