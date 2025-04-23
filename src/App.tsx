import { FC, useEffect } from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import { AppRoutes } from './constants/app-routes';
import CreateOrganizationPage from './pages/CreateOrganizationPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import RootPage from './pages/RootPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import useAuthStore from './stores/global-store';
import SetUpProviders from './providers';

const RedirectedRoutes: string[] = [AppRoutes.SignIn(), AppRoutes.SignUp()];

const App: FC = () => {
  const { checkIfIsAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = checkIfIsAuthenticated();

  useEffect(() => {
    const pathname = location.pathname;
    // NOTE: navigate to sign in if not authenticated and not on redirected routes
    if (!isAuthenticated && !RedirectedRoutes.includes(pathname)) {
      navigate(AppRoutes.SignIn());
    } else if (isAuthenticated && RedirectedRoutes.includes(pathname)) {
      // NOTE: navigate to dashboard if authenticated and on redirected routes
      navigate(AppRoutes.Dashboard());
    }
  }, [location, isAuthenticated, navigate]);

  return (
    <Routes>
      <Route index element={<RootPage />} />
      <Route path={AppRoutes.SignUp()} element={<SignUpPage />} />
      <Route path={AppRoutes.SignIn()} element={<SignInPage />} />
      <Route element={<AuthenticatedRoute />}>
        <Route path={AppRoutes.Dashboard()} element={<Outlet />}>
          <Route index element={<DashboardPage />} />
          <Route
            path={AppRoutes.CreateOrganization()}
            element={<CreateOrganizationPage />}
          />
        </Route>
        <Route path={AppRoutes.Onboarding()} element={<OnboardingPage />} />
      </Route>
    </Routes>
  );
};

const PreloadedApp: FC = () => {
  return (
    <BrowserRouter>
      <SetUpProviders>
        <App />
      </SetUpProviders>
    </BrowserRouter>
  );
};

export default PreloadedApp;
