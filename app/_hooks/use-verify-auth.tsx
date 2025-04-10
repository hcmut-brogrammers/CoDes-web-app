'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { AppRoutes } from '@/_constants/app-routes';
import useGlobalStore from '@/_stores/global-store';
import apiClient from '@/api-client';

const UnredirectedRoutes: string[] = [AppRoutes.SignUp, AppRoutes.SignIn];

const useVerifyAuth = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, refreshTokenId, isHydrated } = useGlobalStore();

  const isAuthenticated = !!accessToken && !!refreshTokenId && isHydrated;
  const shouldRedirectToSignIn =
    !isAuthenticated && !UnredirectedRoutes.includes(pathname);
  const shouldRedirectToDashboard =
    isAuthenticated && UnredirectedRoutes.includes(pathname);

  useEffect(() => {
    if (shouldRedirectToSignIn) {
      router.push(AppRoutes.SignIn);
    } else if (shouldRedirectToDashboard) {
      router.push(AppRoutes.Dashboard());
    }
  }, [shouldRedirectToSignIn, shouldRedirectToDashboard, router, pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Setting access token and refresh token ID in API client');
      apiClient.setAccessToken(accessToken);
      apiClient.setRefreshTokenId(refreshTokenId);
    }
  }, [isAuthenticated]);
};

export default useVerifyAuth;
