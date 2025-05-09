import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

import { AlternateEmailOutlinedIcon } from './Icons';

interface IProps {
  inputProps?: Omit<OutlinedInputProps, 'type'>;
}
const EmailInput: FC<IProps> = ({ inputProps }) => {
  const label = inputProps?.label;

  const endAdorment = (
    <InputAdornment position="end">
      <IconButton edge="end">
        <AlternateEmailOutlinedIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl variant="outlined" fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <OutlinedInput
        {...inputProps}
        type="email"
        endAdornment={endAdorment}
        label={label}
      />
    </FormControl>
  );
};

export default EmailInput;
