import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@/constants/app-routes';
import useAuthStore from '@/stores/global-store';

const AuthenticatedRoute: FC = () => {
  const { checkIfIsAuthenticated } = useAuthStore();

  const isAuthenticated = checkIfIsAuthenticated();
  if (!isAuthenticated) {
    return <Navigate replace to={AppRoutes.SignIn()} />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
