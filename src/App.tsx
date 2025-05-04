import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import { AppRoute, RoutePath } from './constants/app-routes';
import DashboardPage from './pages/DashboardPage';
import DesignProjectsPage from './pages/DesignProjectsPage';
import MembersPage from './pages/MembersPage';
import OrganizationInfoPage from './pages/OrganizationInfoPage';
import OrganizationPage from './pages/OrganizationPage';
import RootPage from './pages/RootPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import useAuthStore from './stores/auth-store';
import { toastOptions } from './utils/toast';
import SetUpProviders from './providers';

import './index.css';

const RedirectedRoutes: string[] = [AppRoute.SignIn(), AppRoute.SignUp()];

const App: FC = () => {
  const { checkIfIsAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = checkIfIsAuthenticated();

  useEffect(() => {
    const pathname = location.pathname;
    // NOTE: navigate to sign in if not authenticated and not on redirected routes
    if (!isAuthenticated && !RedirectedRoutes.includes(pathname)) {
      navigate(AppRoute.SignIn());
    } else if (isAuthenticated && RedirectedRoutes.includes(pathname)) {
      // NOTE: navigate to dashboard if authenticated and on redirected routes
      navigate(AppRoute.Dashboard());
    }
  }, [location, isAuthenticated, navigate]);

  return (
    <Routes>
      <Route index element={<RootPage />} />
      <Route path={RoutePath.SignUp()} element={<SignUpPage />} />
      <Route path={RoutePath.SignIn()} element={<SignInPage />} />
      <Route element={<AuthenticatedRoute />}>
        <Route path={RoutePath.Dashboard()} element={<DashboardPage />}>
          <Route
            path={RoutePath.Organization()}
            element={<OrganizationPage />}
          />
          <Route
            path={RoutePath.OrganizationInfo()}
            element={<OrganizationInfoPage />}
          />
          <Route path={RoutePath.MembersInfo()} element={<MembersPage />} />
          <Route
            path={RoutePath.DesignProjects()}
            element={<DesignProjectsPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

const PreloadedApp: FC = () => {
  return (
    <BrowserRouter>
      <SetUpProviders>
        <App />
        <Toaster toastOptions={toastOptions} />
      </SetUpProviders>
    </BrowserRouter>
  );
};

export default PreloadedApp;
