import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '@/constants/app-routes';
import useAuthStore from '@/stores/auth-store';

const AuthenticatedRoute: FC = () => {
  const { checkIfIsAuthenticated } = useAuthStore();

  const isAuthenticated = checkIfIsAuthenticated();
  if (!isAuthenticated) {
    return <Navigate replace to={AppRoute.SignIn()} />;
  }

  return <Outlet />;
};

export default AuthenticatedRoute;
