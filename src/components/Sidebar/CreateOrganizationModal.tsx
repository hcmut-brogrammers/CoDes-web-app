import { FC } from 'react';

import CreateOrganizationForm from '../CreateOrganizationForm';
import Modal, { ModalProps } from '../ui/Modal';

const CreateOrganizationModal: FC<Pick<ModalProps, 'open' | 'onClose'>> = ({
  open,
  onClose,
}) => {
  const handleSubmitSuccess = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <CreateOrganizationForm onSubmitSuccess={handleSubmitSuccess} />
    </Modal>
  );
};
export default CreateOrganizationModal;
