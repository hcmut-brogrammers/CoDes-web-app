import { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Labels } from '@/assets';
import Column from '@/components/ui/Column';
import Modal, { ModalProps } from '@/components/ui/Modal';
import useDeleteOrganization from '@/hooks/use-delete-organization';
import useModal from '@/hooks/use-modal';
import useSwitchOrganization from '@/hooks/use-switch-organization';
import useGlobalStore from '@/stores/global-store';
import { IOrganization } from '@/types/organization';

interface IProps {
  organization: IOrganization;
}

const DeleteOrganizationButton: FC<IProps> = ({ organization }) => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        {Labels.Actions.Delete}
      </Button>
      <DeleteOrganizationModal
        organization={organization}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

const DeleteOrganizationModal: FC<
  Pick<ModalProps, 'open' | 'onClose'> & {
    organization: IOrganization;
  }
> = ({ organization, open, onClose }) => {
  const { mutateAsync: switchOrganizationAsync } = useSwitchOrganization();
  const { mutateAsync: deleteOrganizationAsync } = useDeleteOrganization();
  const handleSubmit = async () => {
    await deleteOrganizationAsync({ organizationId: organization.id });
    const { currentOrganizationId } = useGlobalStore.getState();
    onClose();
    await switchOrganizationAsync({ organization_id: currentOrganizationId });
  };
  const formik = useFormik({
    initialValues: { organizationName: '' },
    onSubmit: handleSubmit,
    validateOnMount: true,
  });

  const canSubmit = formik.values.organizationName === organization.name;

  return (
    <Modal
      title={Labels.Modal.DeleteOrganization}
      open={open}
      onClose={onClose}
    >
      <Column>
        <Typography>{`Type "${organization.name}" to confirm deleting the organization:`}</Typography>
        <TextField
          type="text"
          variant="outlined"
          label={Labels.InputFields.OrganizationName}
          onChange={(e) =>
            formik.setValues({
              ...formik.values,
              organizationName: e.target.value,
            })
          }
        ></TextField>
        <Button
          variant="contained"
          loading={formik.isSubmitting}
          disabled={!canSubmit}
          onClick={() => formik.handleSubmit()}
        >
          {Labels.Actions.Confirm}
        </Button>
      </Column>
    </Modal>
  );
};

export default DeleteOrganizationButton;
