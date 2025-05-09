import React, { FC, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip, { ChipProps } from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { vsprintf } from 'sprintf-js';
import { useDebounceValue } from 'usehooks-ts';

import { Labels } from '@/assets';
import ActionButton from '@/components/ActionButton';
import PageContainer from '@/components/PageContainer';
import { PersonOutlineRoundedIcon } from '@/components/ui/Icons';
import Modal from '@/components/ui/Modal';
import Row from '@/components/ui/Row';
import { useCreateStyles } from '@/hooks/use-app-style';
import useAutocomplete from '@/hooks/use-autocomplete';
import useCreateInvitations from '@/hooks/use-create-invitations';
import useFetchOrganizationMembers from '@/hooks/use-fetch-organization-members';
import useModal from '@/hooks/use-modal';
import useUninviteMember from '@/hooks/use-uninvite-member';
import { searchUsersByEmail } from '@/services/user';
import useAuthStore from '@/stores/auth-store';
import { AppStyleVariable } from '@/styles';
import { mergeSx } from '@/styles/helper';
import { IOrganizationMember } from '@/types/organization';
import { FunctionCreateStyles } from '@/types/style';
import { IMatchedUser, UserRole } from '@/types/user';
import { CreateInvitationsFormSchema } from '@/utils/schemas';

const MembersPage: FC = () => {
  return (
    <PageContainer>
      <Row justifyContent="flex-end">
        <AddMemberButton />
      </Row>
      <Box>
        <MembersTable />
      </Box>
    </PageContainer>
  );
};
export default MembersPage;

const MembersTable: FC = () => {
  const { tokenData } = useAuthStore();
  const {
    data: organizationMembersData,
    isFetched: isOrganizationMembersDataFetched,
  } = useFetchOrganizationMembers();

  const isLoading =
    !organizationMembersData || !isOrganizationMembersDataFetched;
  const showUninviteButton = (member: IOrganizationMember) =>
    tokenData?.role === UserRole.OrganizationAdmin &&
    tokenData?.user_id !== member.member_id;

  return (
    <Box sx={{ width: '100%', marginTop: '16px' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Member ID</TableCell>
                <TableCell>Member</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Joined at</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizationMembersData.map((member) => (
                <TableRow
                  key={member.member_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {member.member_id}
                  </TableCell>
                  <TableCell align="right">{member.username}</TableCell>
                  <TableCell align="right">{member.email}</TableCell>
                  <TableCell align="right">{member.role}</TableCell>
                  <TableCell align="right">{member.joined_at}</TableCell>
                  <TableCell align="right">
                    {showUninviteButton(member) && (
                      <UninviteMemberButton
                        memberId={member.member_id}
                        memberEmail={member.email}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

const UninviteMemberButton: FC<{ memberId: string; memberEmail: string }> = ({
  memberEmail,
  memberId,
}) => {
  const { mutateAsync: uninviteMemberAsync, isPending } = useUninviteMember();

  const handleClick = async () => {
    await uninviteMemberAsync({
      member_id: memberId,
      member_email: memberEmail,
    });
  };

  return (
    <Button color="error" loading={isPending} onClick={handleClick}>
      {Labels.Actions.Uninvite}
    </Button>
  );
};

interface IForm {
  users: IMatchedUser[];
}

const AddMemberButton: FC = () => {
  const {
    open: openModal,
    handleOpen: handleOpenModal,
    handleClose: handleCloseModal,
  } = useModal();
  const { mutateAsync: createInvitationsAysnc } = useCreateInvitations();
  const handleSubmit = async (values: IForm) => {
    if (!values.users.length) return;
    const userIds = values.users.map(({ id }) => id);
    const emails = values.users.map(({ email }) => email);

    await createInvitationsAysnc({ userIds, emails });
    handleCloseModal();
  };
  const formik = useFormik<IForm>({
    initialValues: {
      users: [],
    },
    onSubmit: handleSubmit,
    validateOnMount: true,
    validationSchema: CreateInvitationsFormSchema,
  });

  const canSend = !Object.values(formik.errors).length && !formik.isSubmitting;
  const isLoading = formik.isSubmitting;

  const handleChange = (_: React.SyntheticEvent, value: IMatchedUser[]) => {
    formik.setValues({ ...formik.values, users: value });
  };

  return (
    <>
      <ActionButton variant="contained" onClick={handleOpenModal}>
        {Labels.Actions.AddMember}
      </ActionButton>
      <Modal
        title={Labels.Modal.AddMember}
        open={openModal}
        onClose={handleCloseModal}
      >
        <UserAutocomplete
          value={formik.values.users}
          handleChange={handleChange}
        />
        <ActionButton
          loading={isLoading}
          disabled={!canSend}
          onClick={() => formik.handleSubmit()}
          sx={{ marginTop: '8px' }}
        >
          {Labels.Actions.Send}
        </ActionButton>
      </Modal>
    </>
  );
};

const UserAutocomplete: FC<{
  value: IMatchedUser[];
  handleChange: (e: React.SyntheticEvent, value: IMatchedUser[]) => void;
}> = ({ value, handleChange }) => {
  const { tokenData } = useAuthStore();
  const {
    open: openMenu,
    loading: loadingMenu,
    handleOpen: handleOpenMenu,
    handleClose: handleCloseMenu,
    handleLoading: handleLoadingMenu,
    handleLoaded: handleMenuLoaded,
  } = useAutocomplete();

  const [debouncedSearchQuery, setSearchQuery] = useDebounceValue('', 1000);
  const [options, setOptions] = useState<IMatchedUser[]>([]);

  const handleOpenOptions = async () => {
    handleOpenMenu();
  };

  const handleCloseOptions = () => {
    handleCloseMenu();
  };

  const handleFetchMatchedUsers = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.length) return;

      handleLoadingMenu();
      const response = await searchUsersByEmail(searchQuery);
      setOptions(response.users);
      handleMenuLoaded();
    },
    [handleLoadingMenu, setOptions, handleMenuLoaded],
  );

  // NOTE: not set handleFetchMatchedUsers as useCallback because it will cause infinite loop
  useEffect(() => {
    handleFetchMatchedUsers(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <Autocomplete
      id="test"
      multiple
      disableClearable
      disableCloseOnSelect
      limitTags={4}
      value={value}
      open={openMenu}
      options={options}
      loading={loadingMenu}
      loadingText={vsprintf(Labels.Loading.SearchingUsers, [
        debouncedSearchQuery,
      ])}
      noOptionsText={Labels.Empty.NoResults}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.email}
      getOptionDisabled={(option) => option.id === tokenData?.user_id}
      onOpen={handleOpenOptions}
      onClose={handleCloseOptions}
      onChange={handleChange}
      sx={{ width: 400 }}
      renderValue={(value, getItemProps) =>
        value.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <MemberChip
              key={key}
              variant="outlined"
              label={option.email}
              {...itemProps}
            />
          );
        })
      }
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.email}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={debouncedSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label={Labels.InputFields.SearchUsers}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingMenu ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
};

const MemberChip: FC<ChipProps> = ({ sx, ...props }) => {
  const styles = useCreateStyles(createStyles);
  return (
    <Chip
      {...props}
      variant="filled"
      icon={<PersonOutlineRoundedIcon />}
      sx={mergeSx(styles.chip, sx)}
    />
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    chip: {
      borderRadius: AppStyleVariable.borderRadius.small,
    },
  };
};
