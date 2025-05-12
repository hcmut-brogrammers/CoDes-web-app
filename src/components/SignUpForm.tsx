import { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Labels } from '@/assets';
import { AppRoute } from '@/constants/app-routes';
import { useCreateStyles } from '@/hooks/use-app-style';
import useSignUp from '@/hooks/use-sign-up';
import { ISignUpParams } from '@/services/auth';
import { FunctionCreateStyles } from '@/types/style';
import { UserRole } from '@/types/user';
import { SignUpFormSchema } from '@/utils/schemas';

import Column from './ui/Column';
import EmailInput from './ui/EmailInput';
import ErrorHelperText from './ui/ErrorHelperText';
import PasswordInput from './ui/PasswordInput';
import Row from './ui/Row';
import UsernameInput from './ui/UsernameInput';

const SignUpForm: FC = () => {
  const styles = useCreateStyles(createStyles);
  const { mutateAsync: signUpAsync } = useSignUp();
  const [error, setError] = useState('');
  const handleSubmit = async (values: ISignUpForm) => {
    try {
      setError('');
      await signUpAsync(values);
    } catch {
      setError(Labels.Error.InvalidEmail);
    }
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

  const canSubmit =
    !Object.values(formik.errors).length && !formik.isSubmitting;
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={styles.container}>
      <Column gap={2}>
        <Column>
          <Typography variant="h5">{Labels.Form.SignUp.Title}</Typography>
          <Typography variant="body2">
            {Labels.Form.SignUp.Description}
          </Typography>
        </Column>
        <Divider />
        <Column gap={2}>
          <UsernameInput
            inputProps={{
              placeholder: Labels.InputPlaceholder.EnterUsername,
              disabled: formik.isSubmitting,
              label: Labels.InputFields.Username,
              value: username,
              onChange: handleChangeField('username'),
            }}
          />
          <EmailInput
            inputProps={{
              placeholder: Labels.InputPlaceholder.EnterEmail,
              disabled: formik.isSubmitting,
              label: Labels.InputFields.Email,
              value: email,
              onChange: handleChangeField('email'),
            }}
          />
          <PasswordInput
            inputProps={{
              placeholder: Labels.InputPlaceholder.EnterPassword,
              disabled: formik.isSubmitting,
              label: Labels.InputFields.Password,
              value: password,
              onChange: handleChangeField('password'),
            }}
          />
          {/* TODO: add helper text */}
          <PasswordInput
            inputProps={{
              placeholder: Labels.InputPlaceholder.EnterConfirmPassword,
              disabled: formik.isSubmitting,
              label: Labels.InputFields.ConfirmPassword,
              value: confirmPassword,
              onChange: handleChangeField('confirmPassword'),
            }}
          />
          <ErrorHelperText error={error} />
        </Column>
        <Divider />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={!canSubmit}
          loading={formik.isSubmitting}
          sx={styles.button}
        >
          {Labels.Actions.SignUp}
        </Button>
      </Column>
      <Row sx={styles.notHaveAccountContainer}>
        <Typography component="span">
          {Labels.Form.SignUp.AlreadyHaveAccount}
        </Typography>
        &nbsp;
        <Link href={AppRoute.SignIn()}>{Labels.Form.SignUp.SignInHere}</Link>
      </Row>
    </Box>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    container: {
      width: 350,
    },
    button: {
      textTransform: 'uppercase',
    },
    notHaveAccountContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: '16px',
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
