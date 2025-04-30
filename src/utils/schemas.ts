import * as Yup from 'yup';

import { Labels } from '@/assets';

export const SignInFormSchema = Yup.object({
  email: Yup.string().email().required(Labels.FieldValidation.EmailRequired),
  password: Yup.string().required(Labels.FieldValidation.PasswordRequired),
});

export const SignUpFormSchema = SignInFormSchema.concat(
  Yup.object({
    username: Yup.string().required(Labels.FieldValidation.UsernameRequired),
  }),
);

export const CreateOrganizationFormSchema = Yup.object({
  name: Yup.string().required(Labels.FieldValidation.OrganizationNameRequired),
  avatarUrl: Yup.string().url().optional(),
});

export const UpdateOrganizationFormSchema = CreateOrganizationFormSchema;

export const AppEnvSchema = Yup.object({
  ApiBaseUrl: Yup.string().required(Labels.FieldValidation.ApiUrlRequired),
});
