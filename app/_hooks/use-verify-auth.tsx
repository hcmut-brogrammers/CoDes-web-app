'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { AppRoutes } from '@/_constants/app-routes';
import useGlobalStore from '@/_stores/global-store';

const UnredirectedRoutes: string[] = [AppRoutes.SignUp, AppRoutes.SignIn];

const useVerifyAuth = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, refreshTokenId, isHydrated } = useGlobalStore();

  const isAuthenticated =
    Boolean(accessToken) && Boolean(refreshTokenId) && isHydrated;
  const shouldRedirectToSignIn =
    !isAuthenticated && !UnredirectedRoutes.includes(pathname);
  const shouldRedirectToDashboard =
    isAuthenticated && UnredirectedRoutes.includes(pathname);

  useEffect(() => {
    if (shouldRedirectToSignIn) {
      router.push(AppRoutes.SignIn);
    } else if (shouldRedirectToDashboard) {
      router.push(AppRoutes.Dashboard);
    }
  }, [shouldRedirectToSignIn, shouldRedirectToDashboard, router, pathname]);
};

export default useVerifyAuth;
