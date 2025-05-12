import { useState } from 'react';

const usePopper = () => {
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

  const openPopper = Boolean(anchorEl);

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return {
    anchorEl,
    openPopper,
    handleToggle,
  };
};

export default usePopper;
