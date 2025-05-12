import { FC } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';

import { Labels } from '@/assets';
import {
  useCreateConditionalStyles,
  useCreateStyles,
} from '@/hooks/use-app-style';
import useDrawer from '@/hooks/use-drawer';
import useNavigateRoute from '@/hooks/use-navigate-route';
import useDesignProjectStore from '@/stores/design-project-store';
import { AppStyleVariable } from '@/styles';
import {
  FunctionCreateConditionalStyles,
  FunctionCreateStyles,
} from '@/types/style';

import ActionButton from '../ActionButton';
import { ChevronLeftRoundedIcon, ChevronRightRoundedIcon } from '../ui/Icons';
import StyledDrawer from '../ui/StyledDrawer';
import StyledList from '../ui/StyledList';

import InspectElementItem from './InspectElementItem';

interface IProps {
  onSelectElement: (elementId: string) => void;
}

const ElementInspectDrawer: FC<IProps> = ({ onSelectElement }) => {
  const { navigateDesignProjects } = useNavigateRoute();
  const styles = useCreateStyles(createStyles);
  const conditionalStyles = useCreateConditionalStyles(createConditionalStyles);
  const { open, toggleDrawer } = useDrawer({ initialValue: true });
  const { elements, getMySelectedElementId } = useDesignProjectStore();

  const selectedElementId = getMySelectedElementId();
  const toggleIcon = open ? (
    <ChevronLeftRoundedIcon fontSize="inherit" />
  ) : (
    <ChevronRightRoundedIcon fontSize="inherit" />
  );

  const handleBackToFiles = () => {
    navigateDesignProjects();
  };

  return (
    <>
      <StyledDrawer
        openedWidth={DrawerWidth}
        variant="permanent"
        open={open}
        anchor="left"
      >
        <StyledList sx={{ padding: '8px' }}>
          <ActionButton onClick={handleBackToFiles} variant="text">
            {Labels.Actions.BackToFiles}
          </ActionButton>
        </StyledList>
        <Divider />
        <StyledList
          subheader={
            <ListSubheader>
              {`${Labels.ElementInspectSidebar.ProjectSection.Header}`}
            </ListSubheader>
          }
        ></StyledList>
        <Divider />
        <StyledList
          subheader={
            <ListSubheader>
              {Labels.ElementInspectSidebar.InspectElementSection.Header}
            </ListSubheader>
          }
        >
          {elements.map((element) => (
            <InspectElementItem
              key={element.id}
              isSelected={selectedElementId === element.id}
              element={element}
              onClick={onSelectElement}
            />
          ))}
        </StyledList>
      </StyledDrawer>
      <Box
        onClick={toggleDrawer}
        sx={conditionalStyles.toggleIconContainer({ open })}
      >
        <IconButton sx={styles.toggleIcon}>{toggleIcon}</IconButton>
      </Box>
    </>
  );
};

const DrawerWidth = 300;
const createStyles: FunctionCreateStyles = () => {
  return {
    toggleIcon: {
      padding: '0px',
      fontSize: AppStyleVariable.iconFontSize.large,
    },
  };
};

const createConditionalStyles: FunctionCreateConditionalStyles = (theme) => {
  return {
    toggleIconContainer: ({ open }) => ({
      borderTopRightRadius: AppStyleVariable.borderRadius.small,
      borderBottomRightRadius: AppStyleVariable.borderRadius.small,
      position: 'absolute',
      bottom: 10,
      border: '1px solid black',
      zIndex: 1,

      ...(open
        ? {
            left: DrawerWidth,
            ...AppStyleVariable.transition.open({ theme, props: ['left'] }),
          }
        : {
            left: 0,
            ...AppStyleVariable.transition.close({ theme, props: ['left'] }),
          }),
    }),
  };
};

export default ElementInspectDrawer;
