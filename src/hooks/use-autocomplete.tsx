import { useState } from 'react';

const useAutocomplete = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoading = () => setLoading(true);
  const handleLoaded = () => setLoading(false);

  return {
    open,
    loading,
    handleOpen,
    handleClose,
    handleLoading,
    handleLoaded,
  };
};

export default useAutocomplete;
