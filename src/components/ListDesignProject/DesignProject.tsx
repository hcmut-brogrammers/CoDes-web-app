import { CSSProperties, FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { formatRelative } from 'date-fns';

import { Labels } from '@/assets';
import {
  useCreateConditionalStyles,
  useCreateStyles,
} from '@/hooks/use-app-style';
import useDeleteDesignProject from '@/hooks/use-delete-design-project';
import useMenu from '@/hooks/use-menu';
import useNavigateRoute from '@/hooks/use-navigate-route';
import useAuthStore from '@/stores/auth-store';
import { AppColor, AppStyleVariable } from '@/styles';
import { AppStylesVariable } from '@/styles/app-style-variable';
import { IDesignProject } from '@/types/design-project';
import {
  FunctionCreateConditionalStyles,
  FunctionCreateStyles,
} from '@/types/style';

import {
  DeleteRoundedIcon,
  FileOpenRoundedIcon,
  MoreHorizRoundedIcon,
} from '../ui/Icons';
import Row from '../ui/Row';
import StyledListItemIcon from '../ui/StyledListItemIcon';
import StyledMenu, { StyledMenuItem } from '../ui/StyledMenu';

interface IProps {
  designProject: IDesignProject;
}
const DesignProject: FC<IProps> = ({ designProject }) => {
  const {
    mutateAsync: deleteDesignProjectAsync,
    isPending: isDeletingDesignProject,
  } = useDeleteDesignProject();
  const styles = useCreateStyles(createStyles);
  const conditionalStyles = useCreateConditionalStyles(createConditionalStyles);

  const editedText = `Edited ${formatRelative(
    new Date(designProject.updated_at),
    new Date(),
  )}`;

  const handleDeleteDesignProject = async (designProjectId: string) => {
    await deleteDesignProjectAsync({ design_project_id: designProjectId });
  };

  return (
    <Box
      sx={conditionalStyles.designProject({
        isDeleting: isDeletingDesignProject,
      })}
    >
      <ImageListItem sx={styles.thumbnail}>
        <MoreButton
          designProjectId={designProject.id}
          onDelete={handleDeleteDesignProject}
        />
        <img
          loading="lazy"
          src={designProject.thumbnail_url}
          alt={designProject.name}
          style={styles.img as CSSProperties}
        />
      </ImageListItem>
      <Row alignItems="center">
        <Box sx={styles.textContainer}>
          <Typography sx={styles.text}>{designProject.name}</Typography>
          <Typography>{editedText}</Typography>
        </Box>
      </Row>
    </Box>
  );
};

const MoreButton: FC<{
  designProjectId: string;
  onDelete: (designProjectId: string) => Promise<void>;
}> = ({ designProjectId, onDelete }) => {
  const { navigateDesignProjectCanvas } = useNavigateRoute();
  const { checkIfIsOrganizationAdmin } = useAuthStore();
  const styles = useCreateStyles(createStyles);
  const { anchorEl, menuOpen, handleOpenMenu, handleCloseMenu } = useMenu();

  const isOrganizationAdmin = checkIfIsOrganizationAdmin();

  const handleClickOpenMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    handleOpenMenu(e);
  };

  const handleOpenFile = () => {
    navigateDesignProjectCanvas(designProjectId);
  };

  const handleDeleteDesignProject = async () => {
    handleCloseMenu();
    await onDelete(designProjectId);
  };

  return (
    <>
      <IconButton sx={styles.moreButton} onClick={handleClickOpenMenu}>
        <MoreHorizRoundedIcon />
      </IconButton>
      <StyledMenu
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            sx: styles.menuPaper,
          },
          list: { sx: styles.menuList },
        }}
      >
        <StyledMenuItem onClick={handleOpenFile} sx={styles.menuItem}>
          <StyledListItemIcon>
            <FileOpenRoundedIcon />
          </StyledListItemIcon>
          <ListItemText primary={Labels.Actions.OpenFile} />
        </StyledMenuItem>
        {isOrganizationAdmin && (
          <StyledMenuItem
            onClick={handleDeleteDesignProject}
            sx={styles.menuItem}
          >
            <StyledListItemIcon>
              <DeleteRoundedIcon />
            </StyledListItemIcon>
            <ListItemText primary={Labels.Actions.Delete} />
          </StyledMenuItem>
        )}
      </StyledMenu>
    </>
  );
};

export const DesignProjectSkeleton: FC = () => {
  return (
    <Skeleton
      variant="rectangular"
      height={280}
      sx={{ borderRadius: AppStyleVariable.borderRadius.medium }}
    />
  );
};

const BorderStyle = `1px solid ${AppColor.border}`;

const createStyles: FunctionCreateStyles = (theme) => {
  const borderRadiusStyles: SxProps = {
    borderTopLeftRadius: AppStyleVariable.borderRadius.medium,
    borderTopRightRadius: AppStyleVariable.borderRadius.medium,
  };

  return {
    thumbnail: {
      ...borderRadiusStyles,
      position: 'relative',
    },
    img: {
      ...borderRadiusStyles,
    },

    moreButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      visibility: 'hidden',
      color: theme.palette.black,
    },

    textContainer: { padding: '8px', borderTop: BorderStyle },
    text: {
      fontWeight: AppStylesVariable.fontWeight.bold,
    },

    menuPaper: {
      minWidth: 'fit-content',
      width: '200px',
    },
    menuList: {
      padding: '8px 0px',
    },
    menuItem: {
      borderRadius: '0px',
    },
  };
};

const createConditionalStyles: FunctionCreateConditionalStyles = () => {
  return {
    designProject: ({ isDeleting }) => ({
      // width: '300px',
      borderRadius: AppStyleVariable.borderRadius.medium,
      border: BorderStyle,

      ...(isDeleting
        ? {
            opacity: 0.5,
          }
        : {
            '&:hover': {
              '& .MuiIconButton-root': {
                visibility: 'visible',
              },
            },
          }),
    }),
  };
};

export default DesignProject;
