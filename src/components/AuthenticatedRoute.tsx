import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoutes } from '@/constants/app-routes';
import useGlobalStore from '@/stores/global-store';

const AuthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { checkIfIsAuthenticated } = useGlobalStore();

  const isAuthenticated = checkIfIsAuthenticated();
  if (!isAuthenticated) {
    return <Navigate replace to={AppRoutes.SignIn} />;
  }

  return children;
};

export default AuthenticatedRoute;
