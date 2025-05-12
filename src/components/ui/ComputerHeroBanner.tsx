import { FC } from 'react';
import ImageListItem from '@mui/material/ImageListItem';

import SignInSvg from '@/assets/sign-in.svg';

const ComputerHeroBanner: FC = () => {
  return (
    <ImageListItem>
      <img src={SignInSvg} alt="hero-banner" loading="lazy" />
    </ImageListItem>
  );
};

export default ComputerHeroBanner;
