import { FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { useCreateStyles } from '@/hooks/use-app-style';
import useDesignProjectWebSocket from '@/hooks/use-design-project-websocket';
import { AppStyleVariable } from '@/styles';
import { FunctionCreateStyles } from '@/types/style';
import {
  createArrowElement,
  createCircleElement,
  createLineElement,
  createRectangleElement,
  createRingElement,
  createStarElement,
  createTextElement,
  createTriangleElement,
} from '@/utils/design-project';

import {
  ArrowRightAltRoundedIcon,
  CircleOutlinedIcon,
  CropDinRoundedIcon,
  DataSaverOffIcon,
  HorizontalRuleRoundedIcon,
  StarBorderRoundedIcon,
  TextFieldsRoundedIcon,
  TriangleRoundedIcon,
} from '../ui/Icons';
import Row from '../ui/Row';

const DesignToolbar: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Box sx={styles.toolbar}>
      <Row>
        <AddRectangleButton />
        <AddCircleButton />
        <AddTextButton />
        <AddRingButton />
        <AddStarButton />
        <AddLineButton />
        <AddLArrowButton />
        <AddTriangleButton />
      </Row>
    </Box>
  );
};

const AddRectangleButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createRectangleElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <CropDinRoundedIcon />
    </IconButton>
  );
};

const AddCircleButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createCircleElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <CircleOutlinedIcon />
    </IconButton>
  );
};

const AddTextButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createTextElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <TextFieldsRoundedIcon />
    </IconButton>
  );
};

const AddRingButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createRingElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <DataSaverOffIcon />
    </IconButton>
  );
};

const AddStarButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createStarElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <StarBorderRoundedIcon />
    </IconButton>
  );
};

const AddLineButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createLineElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <HorizontalRuleRoundedIcon />
    </IconButton>
  );
};

const AddLArrowButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createArrowElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <ArrowRightAltRoundedIcon />
    </IconButton>
  );
};

const AddTriangleButton: FC = () => {
  const { sendCreateElementMessage } = useDesignProjectWebSocket();

  const handleAdd = () => {
    const element = createTriangleElement();
    sendCreateElementMessage(element.id, element);
  };

  return (
    <IconButton onClick={handleAdd}>
      <TriangleRoundedIcon />
    </IconButton>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    toolbar: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      border: `1px solid ${theme.palette.border}`,
      padding: '8px',
      borderRadius: AppStyleVariable.borderRadius.medium,
      transform: 'translateX(-50%)',
    },
  };
};

export default DesignToolbar;
