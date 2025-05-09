import { FC, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

import { VisibilityOffOutlinedIcon, VisibilityOutlinedIcon } from './Icons';

interface IProps {
  inputProps?: Omit<OutlinedInputProps, 'type'>;
}
const PasswordInput: FC<IProps> = ({ inputProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  const label = inputProps?.label;
  const type = showPassword ? 'text' : 'password';

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const endAdorment = (
    <InputAdornment position="end">
      <IconButton
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
        edge="end"
      >
        {showPassword ? (
          <VisibilityOffOutlinedIcon />
        ) : (
          <VisibilityOutlinedIcon />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl variant="outlined" fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <OutlinedInput
        {...inputProps}
        type={type}
        endAdornment={endAdorment}
        label={label}
      />
    </FormControl>
  );
};

export default PasswordInput;
