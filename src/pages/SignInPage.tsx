import { ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Labels } from '@/assets';
import { AppRoutes } from '@/constants/app-routes';
import useSignIn from '@/hooks/use-sign-in';
import { ISignInParams } from '@/services/authenticate';

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: signInAsync } = useSignIn();

  const handleSubmit = async (values: ISignInForm) => {
    await signInAsync(values);
    formik.resetForm({ values: initializeSignInForm() });
    await navigate(AppRoutes.Dashboard);
  };
  const formik = useFormik({
    initialValues: initializeSignInForm(),
    onSubmit: handleSubmit,
  });
  const { email, password } = formik.values;

  const handleChangeEmail =
    (key: keyof ISignInForm) => (e: ChangeEvent<HTMLInputElement>) => {
      formik.setValues({ ...formik.values, [key]: e.target.value });
    };

  const canSubmit =
    !Object.values(formik.errors).length && !formik.isSubmitting;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing={4} sx={{ width: 300 }}>
          <Typography>{Labels.Forms.SignIn}</Typography>
          <TextField
            variant="outlined"
            label={Labels.InputFields.Email}
            value={email}
            onChange={handleChangeEmail('email')}
          />
          <TextField
            variant="outlined"
            label={Labels.InputFields.Password}
            value={password}
            onChange={handleChangeEmail('password')}
          />
          <Button type="submit" variant="contained" disabled={!canSubmit}>
            {Labels.Actions.SignIn}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

interface ISignInForm extends ISignInParams {}

const initializeSignInForm = (): ISignInForm => ({
  email: '',
  password: '',
});

export default SignInPage;
