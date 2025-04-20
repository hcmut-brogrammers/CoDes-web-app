import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const RootPage: FC = () => {
  return <Outlet />;
};

export default RootPage;
