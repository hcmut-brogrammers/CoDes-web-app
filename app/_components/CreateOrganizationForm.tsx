'use client';

import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { Labels } from '@/_assets';
import { AppRoutes } from '@/_constants/app-routes';
import { useCreateStyles } from '@/_hooks/use-app-style';
import useCreateOrganization from '@/_hooks/use-create-organization';
import { FunctionCreateStyles } from '@/_types/style';
import { CreateOrganizationFormSchema } from '@/_utils/schemas';

const CreateOrganizationForm: FC = () => {
  const styles = useCreateStyles(createStyles);
  const router = useRouter();
  const { mutateAsync: createOrganizationAsync } = useCreateOrganization();
  const handleSubmit = async (values: IForm) => {
    await createOrganizationAsync({
      name: values.name,
      avatar_url: values.avatarUrl,
    });
    router.push(AppRoutes.Dashboard());
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

  const canSubmit =
    !Object.values(formik.errors).length && !formik.isSubmitting;
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={styles.container}>
      <Stack direction="column" spacing={4}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {Labels.Forms.CreateOrganization}
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
