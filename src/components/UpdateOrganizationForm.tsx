'use client';

import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';

import { Labels } from '@/assets';
import { useCreateStyles } from '@/hooks/use-app-style';
import useUpdateOrganization from '@/hooks/use-update-organization';
import { IOrganization } from '@/types/organization';
import { FunctionCreateStyles } from '@/types/style';
import { UpdateOrganizationFormSchema } from '@/utils/schemas';

import Row from './ui/Row';

const UpdateOrganizationForm: FC<{ organization: IOrganization }> = ({
  organization,
}) => {
  const styles = useCreateStyles(createStyles);
  const { mutateAsync: updateOrganizationAsync } = useUpdateOrganization();
  const handleSubmit = async (values: IForm) => {
    await updateOrganizationAsync({
      organizationId: organization.id,
      updates: values,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: organization.name,
      avatarUrl: organization.avatar_url,
    },
    onSubmit: handleSubmit,
    validateOnMount: true,
    validationSchema: UpdateOrganizationFormSchema,
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
        <Row justifyContent="space-between">
          <Button
            type="submit"
            variant="contained"
            disabled={!canSubmit}
            loading={formik.isSubmitting}
          >
            {Labels.Actions.Save}
          </Button>
        </Row>
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
  avatarUrl?: string;
}

export default UpdateOrganizationForm;
