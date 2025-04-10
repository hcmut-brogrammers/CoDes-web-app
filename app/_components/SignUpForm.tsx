import { ChangeEvent, FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Labels } from '@/_assets';
import { useCreateStyles } from '@/_hooks/use-app-style';
import useSignUp from '@/_hooks/use-sign-up';
import { ISignUpParams } from '@/_services/authenticate';
import { FunctionCreateStyles } from '@/_types/style';
import { UserRole } from '@/_types/user';
import { SignUpFormSchema } from '@/_utils/schemas';

const SignUpForm: FC = () => {
  const styles = useCreateStyles(createStyles);
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
  const { username, email, password, confirmPassword } = formik.values;

  const handleChangeField =
    (key: keyof ISignUpForm) => (e: ChangeEvent<HTMLInputElement>) => {
      formik.setTouched({ ...formik.touched, [key]: true });
      formik.setValues({ ...formik.values, [key]: e.target.value });
    };

  const showConfirmPasswordError =
    !!formik.errors.confirmPassword && Boolean(formik.touched.confirmPassword);
  const canSubmit =
    !Object.values(formik.errors).length && !formik.isSubmitting;
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={styles.container}>
      <Stack direction="column" spacing={4}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {Labels.Forms.SignUp}
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder={Labels.InputPlaceholder.EnterUsername}
          label={Labels.InputFields.Username}
          disabled={formik.isSubmitting}
          value={username}
          onChange={handleChangeField('username')}
        />
        <TextField
          variant="outlined"
          type="email"
          placeholder={Labels.InputPlaceholder.EnterEmail}
          label={Labels.InputFields.Email}
          disabled={formik.isSubmitting}
          value={email}
          onChange={handleChangeField('email')}
        />
        <TextField
          variant="outlined"
          type="password"
          placeholder={Labels.InputPlaceholder.EnterPassword}
          label={Labels.InputFields.Password}
          disabled={formik.isSubmitting}
          value={password}
          onChange={handleChangeField('password')}
        />
        <TextField
          variant="outlined"
          type="password"
          name="confirmPassword"
          placeholder={Labels.InputPlaceholder.EnterConfirmPassword}
          error={showConfirmPasswordError}
          helperText={
            showConfirmPasswordError ? formik.errors.confirmPassword : null
          }
          label={Labels.InputFields.ConfirmPassword}
          disabled={formik.isSubmitting}
          value={confirmPassword}
          onChange={handleChangeField('confirmPassword')}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!canSubmit}
          loading={formik.isSubmitting}
        >
          {Labels.Actions.SignUp}
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

interface ISignUpForm extends ISignUpParams {
  confirmPassword: string;
}

const initializeSignUpForm = (): ISignUpForm => ({
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  role: UserRole.OrganizationAdmin,
});

export default SignUpForm;
