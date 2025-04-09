'use client';

import { FC, PropsWithChildren } from 'react';

import useVerifyAuth from './_hooks/use-verify-auth';

const Template: FC<PropsWithChildren> = ({ children }) => {
  useVerifyAuth();

  return children;
};

export default Template;
