import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

import { PersonOutlineRoundedIcon } from './Icons';

interface IProps {
  inputProps?: Omit<OutlinedInputProps, 'type'>;
}
const UsernameInput: FC<IProps> = ({ inputProps }) => {
  const label = inputProps?.label;

  const endAdorment = (
    <InputAdornment position="end">
      <IconButton edge="end">
        <PersonOutlineRoundedIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl variant="outlined" fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <OutlinedInput
        {...inputProps}
        type="text"
        endAdornment={endAdorment}
        label={label}
      />
    </FormControl>
  );
};

export default UsernameInput;
