import { ChangeEvent, FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Labels } from '@/_assets';
import { useCreateStyles } from '@/_hooks/use-app-style';
import useSignIn from '@/_hooks/use-sign-in';
import { ISignInParams } from '@/_services/authenticate';
import { FunctionCreateStyles } from '@/_types/style';
import { SignInFormSchema } from '@/_utils/schemas';

const SignInForm: FC = () => {
  const styles = useCreateStyles(createStyles);
  const { mutateAsync: signInAsync } = useSignIn();
  const handleSubmit = async (values: ISignInForm) => {
    await signInAsync(values);
    formik.resetForm({ values: initializeSignInForm() });
  };
  const formik = useFormik({
    initialValues: initializeSignInForm(),
    onSubmit: handleSubmit,
    validateOnMount: true,
    validationSchema: SignInFormSchema,
  });
  const { email, password } = formik.values;

  const handleChangeField =
    (key: keyof ISignInForm) => (e: ChangeEvent<HTMLInputElement>) => {
      formik.setValues({ ...formik.values, [key]: e.target.value });
    };

  const canSubmit =
    !Object.values(formik.errors).length && !formik.isSubmitting;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={styles.container}>
      <Stack direction="column" spacing={4}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {Labels.Forms.SignIn}
        </Typography>
        <TextField
          type="email"
          variant="outlined"
          placeholder={Labels.InputPlaceholder.EnterEmail}
          disabled={formik.isSubmitting}
          label={Labels.InputFields.Email}
          value={email}
          onChange={handleChangeField('email')}
        />
        <TextField
          type="password"
          variant="outlined"
          placeholder={Labels.InputPlaceholder.EnterPassword}
          disabled={formik.isSubmitting}
          label={Labels.InputFields.Password}
          value={password}
          onChange={handleChangeField('password')}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!canSubmit}
          loading={formik.isSubmitting}
        >
          {Labels.Actions.SignIn}
        </Button>
      </Stack>
    </Box>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    container: {
      width: 350,
    },
  };
};

interface ISignInForm extends ISignInParams {}

const initializeSignInForm = (): ISignInForm => ({
  email: '',
  password: '',
});

export default SignInForm;
