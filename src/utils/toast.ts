import toast, { ToastOptions } from 'react-hot-toast';
import { vsprintf } from 'sprintf-js';

import { Labels } from '@/assets';

export const toastOptions: ToastOptions = {
  position: 'bottom-right',
  duration: 4000,
  removeDelay: 500,
};

const ToastSuccess = {
  CreateInvitations: (emails: string[]) => {
    if (!emails.length) return;

    const emailsText =
      emails.length <= 2
        ? emails.join(' and ')
        : emails.length === 3
        ? `${emails.slice(0, 2).join(', ')} and ${emails[2]}`
        : `${emails.slice(0, 2).join(', ')} and other ${
            emails.length - 2
          } members`;
    const message = vsprintf(Labels.Toast.Success.CreateInvitations, [
      emailsText,
    ]);
    toast.success(message);
  },
  MarkInvitationAsRead: () => {
    const message = Labels.Toast.Success.MarkInvitationAsRead;
    toast.success(message);
  },
  MarkInvitationAsUnread: () => {
    const message = Labels.Toast.Success.MarkInvitationAsUnread;
    toast.success(message);
  },
};

export const ToastManager = {
  Success: ToastSuccess,
};
