import { FC } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { parseISO } from 'date-fns';

import { Labels } from '@/assets';
import useFetchUserInvitations from '@/hooks/use-fetch-user-invitations';
import useMarkInvitationAsRead from '@/hooks/use-mark-invitation-read';
import useMarkInvitationAsUnread from '@/hooks/use-mark-invitation-unread';
import useMenu from '@/hooks/use-menu';
import { IUserInvitation } from '@/types/invitation';

import Column from '../ui/Column';
import { NotificationsRoundedIcon } from '../ui/Icons';
import StyledMenu, { StyledMenuItem, StyledMenuProps } from '../ui/StyledMenu';

const InvitationNotiMenu: FC = () => {
  const { anchorEl, handleOpenMenu, handleCloseMenu, menuOpen } = useMenu();
  const { data: userInvitationsData, isFetched: isUserInvitationsDataFetched } =
    useFetchUserInvitations();

  const isDataFetched = !!userInvitationsData && isUserInvitationsDataFetched;
  const badgeContent = isDataFetched
    ? userInvitationsData.filter((userInvitation) => !userInvitation.is_read)
        .length
    : 0;

  return (
    <>
      <Column alignItems="flex-end">
        <IconButton onClick={handleOpenMenu}>
          <Badge badgeContent={badgeContent} color="secondary">
            <NotificationsRoundedIcon color="action" />
          </Badge>
        </IconButton>
      </Column>
      <InvitationsMenu
        anchorEl={anchorEl}
        open={menuOpen}
        loading={!isDataFetched}
        userInvitations={userInvitationsData!}
        onClose={handleCloseMenu}
      />
    </>
  );
};

const InvitationsMenu: FC<
  StyledMenuProps & {
    loading: boolean;
    userInvitations: IUserInvitation[];
  }
> = ({ loading, userInvitations, ...props }) => {
  return (
    <StyledMenu
      {...props}
      slotProps={{
        list: {
          sx: {
            maxHeight: '400px',
            width: '400px',
          },
        },
      }}
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        userInvitations.map((userInvitation) => (
          <UserInvitation
            key={userInvitation.id}
            userInvitation={userInvitation}
          />
        ))
      )}
    </StyledMenu>
  );
};

const UserInvitation: FC<{ userInvitation: IUserInvitation }> = ({
  userInvitation,
}) => {
  const content = `${userInvitation.sender.username} invited you to join ${
    userInvitation.organization.name
  } organization on ${parseISO(userInvitation.created_at).toLocaleString()}`;
  const showMarkReadButton = !userInvitation.is_read;
  const showMarkUnreadButton = !showMarkReadButton;

  return (
    <StyledMenuItem>
      <Column sx={{ width: '100%' }}>
        <Box>
          <Typography>{content}</Typography>
        </Box>
        {showMarkReadButton && (
          <MarkReadButton invitationId={userInvitation.id} />
        )}
        {showMarkUnreadButton && (
          <MarkUnreadButton invitationId={userInvitation.id} />
        )}
      </Column>
    </StyledMenuItem>
  );
};

const MarkReadButton: FC<{ invitationId: string }> = ({ invitationId }) => {
  const { mutateAsync: markInvitationAsReadAsync, isPending } =
    useMarkInvitationAsRead();

  const handleClick = async () => {
    await markInvitationAsReadAsync({ invitationId });
  };

  return (
    <Button color="info" loading={isPending} onClick={handleClick}>
      {Labels.Actions.MarkRead}
    </Button>
  );
};

const MarkUnreadButton: FC<{ invitationId: string }> = ({ invitationId }) => {
  const { mutateAsync: markInvitationAsUnreadAsync, isPending } =
    useMarkInvitationAsUnread();

  const handleClick = async () => {
    await markInvitationAsUnreadAsync({ invitationId });
  };

  return (
    <Button color="info" loading={isPending} onClick={handleClick}>
      {Labels.Actions.MarkUnread}
    </Button>
  );
};

export default InvitationNotiMenu;
