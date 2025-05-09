import { FC } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { parseISO } from 'date-fns';

import { Labels } from '@/assets';
import { InvitationStatus, InviteeAction } from '@/constants/enum';
import useFetchUserInvitations from '@/hooks/use-fetch-user-invitations';
import useMarkInvitationAsRead from '@/hooks/use-mark-invitation-read';
import useMarkInvitationAsUnread from '@/hooks/use-mark-invitation-unread';
import useMenu from '@/hooks/use-menu';
import useTakeInvitationAction from '@/hooks/use-take-invitation-action';
import { IUserInvitation } from '@/types/invitation';

import Column from '../../ui/Column';
import { NotificationsRoundedIcon } from '../../ui/Icons';
import Row from '../../ui/Row';
import StyledMenu, {
  StyledMenuItem,
  StyledMenuProps,
} from '../../ui/StyledMenu';
import SidebarListItem from '../SidebarListItem';
import SidebarListItemButton from '../SidebarListItemButton';
import SidebarListItemIcon from '../SidebarListItemIcon';
import SidebarListItemText from '../SidebarListItemText';

interface IProps {
  open: boolean;
}

const UserInvitations: FC<IProps> = ({ open }) => {
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
      <SidebarListItem>
        <SidebarListItemButton onClick={handleOpenMenu}>
          <SidebarListItemIcon open={open}>
            <Badge badgeContent={badgeContent} color="secondary">
              <NotificationsRoundedIcon color="action" />
            </Badge>
          </SidebarListItemIcon>
          <SidebarListItemText
            open={open}
            primary={Labels.Sidebar.UserSection.Invitations}
          />
        </SidebarListItemButton>
      </SidebarListItem>
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
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
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
  const shouldShowButtons = userInvitation.status === InvitationStatus.Pending;
  const showMarkReadButton = shouldShowButtons && !userInvitation.is_read;
  const showMarkUnreadButton = shouldShowButtons && userInvitation.is_read;
  const isAccepted = userInvitation.status === InvitationStatus.Accepted;
  const isRejected = userInvitation.status === InvitationStatus.Rejected;

  return (
    <StyledMenuItem>
      <Column sx={{ width: '100%' }}>
        <Box>
          <Typography>{content}</Typography>
        </Box>
        <Row gap={4} sx={{ justifyContent: 'flex-end' }}>
          {showMarkReadButton && (
            <MarkReadButton invitationId={userInvitation.id} />
          )}
          {showMarkUnreadButton && (
            <MarkUnreadButton invitationId={userInvitation.id} />
          )}
          {shouldShowButtons && (
            <>
              <AcceptInvitationButton
                invitationId={userInvitation.id}
                organizationName={userInvitation.organization.name}
              />
              <RejectInvitationButton
                invitationId={userInvitation.id}
                organizationName={userInvitation.organization.name}
              />
            </>
          )}
        </Row>
        <Row gap={4} sx={{ justifyContent: 'flex-end' }}>
          {isAccepted && (
            <Typography color="primary">
              {Labels.InvitationStatus.Accepted}
            </Typography>
          )}
          {isRejected && (
            <Typography color="error">
              {Labels.InvitationStatus.Rejected}
            </Typography>
          )}
        </Row>
      </Column>
    </StyledMenuItem>
  );
};

const AcceptInvitationButton: FC<{
  invitationId: string;
  organizationName: string;
}> = ({ invitationId, organizationName }) => {
  const { mutateAsync: takeInvitationAsync, isPending } =
    useTakeInvitationAction();

  const handleClick = async () => {
    await takeInvitationAsync({
      invitation_id: invitationId,
      action: InviteeAction.Accept,
      organization_name: organizationName,
    });
  };

  return (
    <Button color="success" loading={isPending} onClick={handleClick}>
      {Labels.Actions.Accept}
    </Button>
  );
};

const RejectInvitationButton: FC<{
  invitationId: string;
  organizationName: string;
}> = ({ invitationId, organizationName }) => {
  const { mutateAsync: takeInvitationAsync, isPending } =
    useTakeInvitationAction();

  const handleClick = async () => {
    await takeInvitationAsync({
      invitation_id: invitationId,
      action: InviteeAction.Reject,
      organization_name: organizationName,
    });
  };

  return (
    <Button color="error" loading={isPending} onClick={handleClick}>
      {Labels.Actions.Reject}
    </Button>
  );
};

const MarkReadButton: FC<{ invitationId: string }> = ({ invitationId }) => {
  const { mutateAsync: markInvitationAsReadAsync, isPending } =
    useMarkInvitationAsRead();

  const handleClick = async () => {
    await markInvitationAsReadAsync({ invitation_id: invitationId });
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
    await markInvitationAsUnreadAsync({ invitation_id: invitationId });
  };

  return (
    <Button color="info" loading={isPending} onClick={handleClick}>
      {Labels.Actions.MarkUnread}
    </Button>
  );
};

export default UserInvitations;
