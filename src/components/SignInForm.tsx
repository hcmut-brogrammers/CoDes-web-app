import { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Labels } from '@/assets';
import { AppRoute } from '@/constants/app-routes';
import { useCreateStyles } from '@/hooks/use-app-style';
import useSignIn from '@/hooks/use-sign-in';
import { ISignInParams } from '@/services/auth';
import { FunctionCreateStyles } from '@/types/style';
import { SignInFormSchema } from '@/utils/schemas';

import Column from './ui/Column';
import EmailInput from './ui/EmailInput';
import ErrorHelperText from './ui/ErrorHelperText';
import PasswordInput from './ui/PasswordInput';
import Row from './ui/Row';

const SignInForm: FC = () => {
  const navigate = useNavigate();
  const styles = useCreateStyles(createStyles);
  const { mutateAsync: signInAsync } = useSignIn();
  const [error, setError] = useState('');

  const handleSubmit = async (values: ISignInForm) => {
    try {
      setError('');
      await signInAsync(values);
      formik.resetForm({ values: initializeSignInForm() });
      navigate(AppRoute.Dashboard());
    } catch {
      setError(Labels.Error.InvalidEmailOrPassword);
    }
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
      <Column gap={2}>
        <Column>
          <Typography variant="h5">{Labels.Form.SignIn.Title}</Typography>
          <Typography variant="body2">
            {Labels.Form.SignIn.Description}
          </Typography>
        </Column>
        <Divider />
        <Column gap={2}>
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
        </Column>
        <ErrorHelperText error={error} />
        <Divider />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={!canSubmit}
          loading={formik.isSubmitting}
          sx={styles.button}
        >
          {Labels.Actions.SignIn}
        </Button>
      </Column>
      <Row sx={styles.notHaveAccountContainer}>
        <Typography component="span">
          {Labels.Form.SignIn.NotHaveAccount}
        </Typography>
        &nbsp;
        <Link href={AppRoute.SignUp()}>{Labels.Form.SignIn.SignUpHere}</Link>
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

interface ISignInForm extends ISignInParams {}

const initializeSignInForm = (): ISignInForm => ({
  email: '',
  password: '',
});

export default SignInForm;
