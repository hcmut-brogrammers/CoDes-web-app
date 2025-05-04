import { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';

import { Labels } from '@/assets';
import ListDesignProject from '@/components/ListDesignProject/ListDesignProject';
import Modal from '@/components/ui/Modal';
import useCreateDesignProject from '@/hooks/use-create-design-project';
import useFetchDesignProjects from '@/hooks/use-fetch-design-projects';
import useModal from '@/hooks/use-modal';
import useAuthStore from '@/stores/auth-store';
import { CreateDesignProjectFormSchema } from '@/utils/schemas';

const DesignProjectsPage: FC = () => {
  const { checkIfIsOrganizationAdmin } = useAuthStore();
  const { data: designProjectsData, isFetched: isDesignProjectsDataFetched } =
    useFetchDesignProjects();

  const isOrganizationAdmin = checkIfIsOrganizationAdmin();
  const isDesignProjectsDataFetching =
    !designProjectsData || !isDesignProjectsDataFetched;

  return (
    <Box>
      {isOrganizationAdmin && <CreateDesignProjectButton />}
      <Box sx={{ padding: '16px' }}>
        <ListDesignProject
          isLoading={isDesignProjectsDataFetching}
          designProjects={designProjectsData!}
        />
      </Box>
    </Box>
  );
};

interface IForm {
  name: string;
}

const CreateDesignProjectButton: FC = () => {
  const { mutateAsync: createDesignProjectAsync } = useCreateDesignProject();
  const {
    open: openModal,
    handleOpen: handleOpenModal,
    handleClose: handleCloseModal,
  } = useModal();
  const handleSubmit = async (values: IForm) => {
    await createDesignProjectAsync({
      name: values.name,
    });
    handleCloseModal();
  };
  const formik = useFormik<IForm>({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
    validateOnMount: true,
    validationSchema: CreateDesignProjectFormSchema,
  });

  const canSend = !Object.values(formik.errors).length && !formik.isSubmitting;
  const isLoading = formik.isSubmitting;

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{ alignSelf: 'flex-end' }}
      >
        {Labels.Actions.CreateDesignProject}
      </Button>
      <Modal
        title={Labels.Modal.CreateDesignProject}
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            type="text"
            variant="outlined"
            placeholder={Labels.InputPlaceholder.DesignProjectName}
            disabled={formik.isSubmitting}
            label={Labels.InputFields.DesignProjectName}
            value={formik.values.name}
            onChange={(e) =>
              formik.setValues({ ...formik.values, name: e.target.value })
            }
          />
          <Button
            type="submit"
            loading={isLoading}
            disabled={!canSend}
            sx={{ marginTop: '8px' }}
          >
            {Labels.Actions.Create}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DesignProjectsPage;
