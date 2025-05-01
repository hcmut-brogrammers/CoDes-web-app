import React, { FC, useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip, { ChipProps } from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { vsprintf } from 'sprintf-js';
import { useDebounceValue } from 'usehooks-ts';

import { Labels } from '@/assets';
import Column from '@/components/ui/Column';
import { PersonOutlineRoundedIcon } from '@/components/ui/Icons';
import Modal from '@/components/ui/Modal';
import { useCreateStyles } from '@/hooks/use-app-style';
import useAutocomplete from '@/hooks/use-autocomplete';
import useCreateInvitations from '@/hooks/use-create-invitations';
import useModal from '@/hooks/use-modal';
import { searchUsersByEmail } from '@/services/user';
import useAuthStore from '@/stores/auth-store';
import { AppStyleVariable } from '@/styles';
import { mergeSx } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';
import { IMatchedUser } from '@/types/user';
import { CreateInvitationsFormSchema } from '@/utils/schemas';

const MembersPage: FC = () => {
  return (
    <Box>
      <Column>
        <AddMemberButton />
      </Column>
    </Box>
  );
};
export default MembersPage;

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
      <Button variant="contained" onClick={handleOpenModal}>
        {Labels.Actions.AddMember}
      </Button>
      <Modal
        title={Labels.Modal.AddMember}
        open={openModal}
        onClose={handleCloseModal}
      >
        <UserAutocomplete
          value={formik.values.users}
          handleChange={handleChange}
        />
        <Button
          loading={isLoading}
          disabled={!canSend}
          onClick={() => formik.handleSubmit()}
          sx={{ marginTop: '8px' }}
        >
          {Labels.Actions.Send}
        </Button>
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
    [handleLoadingMenu, handleMenuLoaded, setOptions],
  );

  useEffect(() => {
    handleFetchMatchedUsers(debouncedSearchQuery);
  }, [handleFetchMatchedUsers, debouncedSearchQuery]);

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
