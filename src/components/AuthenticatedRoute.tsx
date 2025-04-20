import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@/constants/app-routes';
import useAutoRefreshToken from '@/hooks/use-auto-refresh-token';
import useGlobalStore from '@/stores/global-store';

const AuthenticatedRoute: FC = () => {
  const { checkIfIsAuthenticated } = useGlobalStore();
  useAutoRefreshToken();

  const isAuthenticated = checkIfIsAuthenticated();
  if (!isAuthenticated) {
    return <Navigate replace to={AppRoutes.SignIn()} />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
