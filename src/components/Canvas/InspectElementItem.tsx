import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

import { Keyboard, ShapeType } from '@/constants/enum';
import {
  useCreateConditionalStyles,
  useCreateStyles,
} from '@/hooks/use-app-style';
import useDesignProjectWebSocket from '@/hooks/use-design-project-websocket';
import { DesignElement } from '@/types/design-element';
import {
  FunctionCreateConditionalStyles,
  FunctionCreateStyles,
} from '@/types/style';
import { isTriangleElement } from '@/utils/design-project';

import {
  ArrowRightAltRoundedIcon,
  CircleOutlinedIcon,
  CropDinRoundedIcon,
  DataSaverOffIcon,
  DeleteRoundedIcon,
  HorizontalRuleRoundedIcon,
  LooksRoundedIcon,
  PhotoRoundedIcon,
  StarBorderRoundedIcon,
  TextFieldsRoundedIcon,
  TriangleRoundedIcon,
} from '../ui/Icons';
import StyledListItem from '../ui/StyledListItem';
import StyledListItemButton from '../ui/StyledListItemButton';
import StyledListItemIcon from '../ui/StyledListItemIcon';

interface IProps {
  isSelected: boolean;
  element: DesignElement;
  onClick: (elementId: string) => void;
}

const shapeTypeElementIconMap: Record<string, ReactNode> = {
  [ShapeType.Rectangle]: <CropDinRoundedIcon />,
  [ShapeType.Circle]: <CircleOutlinedIcon />,
  [ShapeType.Text]: <TextFieldsRoundedIcon />,
  [ShapeType.Ring]: <DataSaverOffIcon />,
  [ShapeType.Star]: <StarBorderRoundedIcon />,
  [ShapeType.Line]: <HorizontalRuleRoundedIcon />,
  [ShapeType.Arrow]: <ArrowRightAltRoundedIcon />,
  [ShapeType.Image]: <PhotoRoundedIcon />,
  [ShapeType.Ellipse]: <LooksRoundedIcon />,
};

const getElementIcon = (element: DesignElement) => {
  if (Object.keys(shapeTypeElementIconMap).includes(element.shapeType)) {
    return shapeTypeElementIconMap[element.shapeType];
  }

  if (isTriangleElement(element)) {
    return <TriangleRoundedIcon />;
  }

  return null;
};

const InspectElementItem: FC<IProps> = memo(
  ({ isSelected, element, onClick }) => {
    const { sendDeleteElementMessage, sendUpdateElementMessage } =
      useDesignProjectWebSocket();
    const styles = useCreateStyles(createStyles);
    const conditionalStyles = useCreateConditionalStyles(
      createConditionalStyles,
    );
    const [temporaryName, setTemporaryName] = useState(
      element.name ?? element.id,
    );

    const icon = getElementIcon(element);

    const handleChangeTemporaryName = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const value = e.target.value;
      setTemporaryName(value);
    };

    const handleUpdateElementName = () => {
      if (element.name !== temporaryName) {
        sendUpdateElementMessage(element.id, {
          ...element,
          name: temporaryName,
        });
      }
    };

    const handleBlur = () => {
      handleUpdateElementName();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;
      if (key === Keyboard.Enter) {
        const target = e.target as HTMLInputElement;
        target.blur();
        handleUpdateElementName();
      }
    };

    const handleDeleteElement = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      e.stopPropagation();
      sendDeleteElementMessage(element.id);
    };

    useEffect(() => {
      setTemporaryName(element.name ?? element.id);
    }, [element]);

    return (
      <StyledListItem
        secondaryAction={
          <IconButton edge="end" onClick={handleDeleteElement}>
            <DeleteRoundedIcon />
          </IconButton>
        }
        sx={conditionalStyles.item({ isSelected })}
      >
        <StyledListItemButton
          onClick={() => onClick(element.id)}
          sx={styles.button}
        >
          <StyledListItemIcon>{icon}</StyledListItemIcon>
          <Input
            value={temporaryName}
            onChange={handleChangeTemporaryName}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            sx={styles.input}
          ></Input>
        </StyledListItemButton>
      </StyledListItem>
    );
  },
);

const createStyles: FunctionCreateStyles = () => {
  return {
    button: {},
    input: {
      '&::before': {
        border: 'none',
      },
      '&:hover': {
        border: 'none',
      },
    },
  };
};

const createConditionalStyles: FunctionCreateConditionalStyles = (theme) => {
  return {
    item: ({ isSelected }) => ({
      padding: '0px',
      ...(isSelected && {
        backgroundColor: theme.palette.selected,
      }),
    }),
  };
};

export default InspectElementItem;
