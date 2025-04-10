import * as Yup from 'yup';

import { Labels } from '@/_assets';

export const SignInFormSchema = Yup.object({
  email: Yup.string().email().required(Labels.FieldValidation.EmailRequired),
  password: Yup.string().required(Labels.FieldValidation.PasswordRequired),
});

export const SignUpFormSchema = SignInFormSchema.concat(
  Yup.object({
    username: Yup.string().required(Labels.FieldValidation.UsernameRequired),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], Labels.FieldValidation.PasswordMisatch)
      .required(Labels.FieldValidation.ConfirmPasswordRequired),
  }),
);

export const CreateOrganizationFormSchema = Yup.object({
  name: Yup.string().required(Labels.FieldValidation.OrganizationNameRequired),
  avatarUrl: Yup.string().optional(),
});

export const AppEnvSchema = Yup.object({
  ApiUrl: Yup.string().required(Labels.FieldValidation.ApiUrlRequired),
});
