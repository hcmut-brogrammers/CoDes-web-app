'use client';

import { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Labels } from '@/_assets';
import { AppRoutes } from '@/_constants/app-routes';
import useSignIn from '@/_hooks/use-sign-in';
import { ISignInParams } from '@/_services/authenticate';

export default function Page() {
  const router = useRouter();
  const { mutateAsync: signInAsync } = useSignIn();

  const handleSubmit = async (values: ISignInForm) => {
    await signInAsync(values);
    formik.resetForm({ values: initializeSignInForm() });
    router.push(AppRoutes.Dashboard);
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
        <Link href={AppRoutes.SignUp}>
          <Typography sx={{ color: 'blue', textAlign: 'center', mt: 2 }}>
            {Labels.Actions.SignUp}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

interface ISignInForm extends ISignInParams {}

const initializeSignInForm = (): ISignInForm => ({
  email: '',
  password: '',
});
