import { useState } from 'react';

interface IUseDrawer {
  initialValue: boolean;
}
const useDrawer = ({ initialValue = false }: IUseDrawer) => {
  const [open, setOpen] = useState(initialValue);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return {
    open,
    toggleDrawer,
  };
};

export default useDrawer;
