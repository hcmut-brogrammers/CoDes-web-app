'use client';

import { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import Link from 'next/link';

import { Labels } from '@/_assets';
import { AppRoutes } from '@/_constants/app-routes';
import useSignUp from '@/_hooks/use-sign-up';
import { ISignUpParams } from '@/_services/authenticate';
import { UserRole } from '@/_types/user';
import { SignUpFormSchema } from '@/_utils/schemas';

export default function Page() {
  const { mutateAsync: signUpAsync } = useSignUp();
  const handleSubmit = async (values: ISignUpForm) => {
    await signUpAsync(values);
  };
  const formik = useFormik<ISignUpForm>({
    initialValues: initializeSignUpForm(),
    onSubmit: handleSubmit,
    validateOnMount: true,
    validationSchema: SignUpFormSchema,
  });
  const { username, email, password } = formik.values;

  const handleChangeEmail =
    (key: keyof ISignUpForm) => (e: ChangeEvent<HTMLInputElement>) => {
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
          <Typography>{Labels.Forms.SignUp}</Typography>
          <TextField
            variant="outlined"
            label={Labels.InputFields.Username}
            value={username}
            onChange={handleChangeEmail('username')}
          />
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
            {Labels.Actions.SignUp}
          </Button>
        </Stack>
        <Link href={AppRoutes.SignIn}>
          <Typography sx={{ color: 'blue', textAlign: 'center', mt: 2 }}>
            {Labels.Actions.SignIn}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export interface ISignUpForm extends ISignUpParams {}

const initializeSignUpForm = (): ISignUpForm => ({
  email: '',
  password: '',
  username: '',
  role: UserRole.OrganizationAdmin,
});
