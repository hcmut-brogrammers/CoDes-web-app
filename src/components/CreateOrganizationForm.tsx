'use client';

import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Labels } from '@/assets';
import { AppRoutes } from '@/constants/app-routes';
import { useCreateStyles } from '@/hooks/use-app-style';
import useCreateOrganization from '@/hooks/use-create-organization';
import useAuthStore from '@/stores/global-store';
import { FunctionCreateStyles } from '@/types/style';
import { makeCreateFirstOrganizationInstruction } from '@/utils/instruction';
import { CreateOrganizationFormSchema } from '@/utils/schemas';

const CreateOrganizationForm: FC = () => {
  const { tokenData } = useAuthStore();
  const styles = useCreateStyles(createStyles);
  const navigate = useNavigate();
  const { mutateAsync: createOrganizationAsync } = useCreateOrganization();
  const handleSubmit = async (values: IForm) => {
    await createOrganizationAsync({
      name: values.name,
      avatar_url: values.avatarUrl,
    });
    navigate(AppRoutes.Dashboard());
  };
  const formik = useFormik({
    initialValues: initializeForm(),
    onSubmit: handleSubmit,
    validateOnMount: true,
    validationSchema: CreateOrganizationFormSchema,
  });

  const { name, avatarUrl } = formik.values;

  const handleChangeField =
    (key: keyof IForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      formik.setValues({ ...formik.values, [key]: e.target.value });
      formik.setTouched({ ...formik.touched, [key]: true });
    };

  const formLabel = makeCreateFirstOrganizationInstruction(tokenData.username);
  const canSubmit =
    !Object.values(formik.errors).length && !formik.isSubmitting;
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={styles.container}>
      <Stack direction="column" spacing={4}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {formLabel}
        </Typography>
        <TextField
          type="text"
          variant="outlined"
          placeholder={Labels.InputPlaceholder.AssignOrganizationName}
          disabled={formik.isSubmitting}
          label={Labels.InputFields.OrganizationName}
          value={name}
          onChange={handleChangeField('name')}
        />
        <TextField
          type="text"
          variant="outlined"
          placeholder={Labels.InputPlaceholder.AssignOrganizationAvatarUrl}
          disabled={formik.isSubmitting}
          label={Labels.InputFields.OrganizationAvatarUrl}
          value={avatarUrl}
          onChange={handleChangeField('avatarUrl')}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!canSubmit}
          loading={formik.isSubmitting}
        >
          {Labels.Actions.Create}
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

interface IForm {
  name: string;
  avatarUrl: string;
}

const initializeForm = (): IForm => ({
  name: '',
  avatarUrl: '',
});

export default CreateOrganizationForm;
