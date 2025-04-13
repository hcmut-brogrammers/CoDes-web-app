import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import { AppRoutes } from './constants/app-routes';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SetUpProviders from './providers';

const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.SignUp} element={<SignUpPage />}></Route>
      <Route path={AppRoutes.SignIn} element={<SignInPage />}></Route>
      <Route
        path={AppRoutes.Dashboard}
        element={
          <AuthenticatedRoute>
            <Routes>
              <Route index element={<DashboardPage />} />
            </Routes>
          </AuthenticatedRoute>
        }
      />
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
