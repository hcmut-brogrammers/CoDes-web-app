import { FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { useCreateStyles } from '@/hooks/use-app-style';
import useDesignProjectWebSocket from '@/hooks/use-design-project-websocket';
import { AppStyleVariable } from '@/styles';
import { FunctionCreateStyles } from '@/types/style';
import {
  createCircleElement,
  createRectangleElement,
} from '@/utils/design-project';

import { CircleOutlinedIcon, CropDinRoundedIcon } from '../ui/Icons';
import Row from '../ui/Row';

const DesignToolbar: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Box sx={styles.container}>
      <Row>
        <AddRectangleButton />
        <AddCircleButton />
      </Row>
    </Box>
  );
};

const AddRectangleButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAddRectangleElement = () => {
    const element = createRectangleElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAddRectangleElement}>
      <CropDinRoundedIcon />
    </IconButton>
  );
};

const AddCircleButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAddCircleElement = () => {
    const element = createCircleElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAddCircleElement}>
      <CircleOutlinedIcon />
    </IconButton>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    container: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      border: `1px solid ${theme.palette.border}`,
      padding: '8px',
      borderRadius: AppStyleVariable.borderRadius.medium,
    },
  };
};

export default DesignToolbar;
