import React, { useState } from 'react';

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const menuOpen = !!anchorEl;

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return {
    anchorEl,
    menuOpen,
    handleOpenMenu,
    handleCloseMenu,
  };
};

export default useMenu;
