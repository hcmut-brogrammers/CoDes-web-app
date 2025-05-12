import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IProps {
  error: Nilable<string>;
}

const ErrorHelperText: FC<IProps> = ({ error }) => {
  return (
    <Box sx={{ height: '24px' }}>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default ErrorHelperText;
