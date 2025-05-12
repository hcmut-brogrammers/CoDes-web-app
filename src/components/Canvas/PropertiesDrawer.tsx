import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Labels } from '@/assets';
import { Keyboard } from '@/constants/enum';
import {
  useCreateConditionalStyles,
  useCreateStyles,
} from '@/hooks/use-app-style';
import useDesignProjectWebSocket from '@/hooks/use-design-project-websocket';
import useDrawer from '@/hooks/use-drawer';
import useDesignProjectStore from '@/stores/design-project-store';
import { AppStyleVariable } from '@/styles';
import { DesignElement, IRectangle } from '@/types/design-element';
import {
  FunctionCreateConditionalStyles,
  FunctionCreateStyles,
} from '@/types/style';

import JoinedUserGroup from '../JoinedUserGroup';
import Column from '../ui/Column';
import {
  ChevronLeftRoundedIcon,
  ChevronRightRoundedIcon,
  ColorLensRoundedIcon,
  OpacityRoundedIcon,
  SquareFootRoundedIcon,
} from '../ui/Icons';
import Row from '../ui/Row';
import StyledDrawer from '../ui/StyledDrawer';
import StyledList from '../ui/StyledList';

interface IProps {
  selectedElementId?: string | null;
}

const PropertiesDrawer: FC<IProps> = ({ selectedElementId }) => {
  const styles = useCreateStyles(createStyles);
  const conditionalStyles = useCreateConditionalStyles(createConditionalStyles);
  const { open, toggleDrawer } = useDrawer({ initialValue: true });
  const { elements } = useDesignProjectStore();
  const { sendUpdateElementMessage } = useDesignProjectWebSocket();

  const selectedElement = useMemo(
    () => elements.find((element) => element.id === selectedElementId),
    [elements, selectedElementId],
  );
  const shouldShowProperties = !!selectedElement && !!selectedElementId;
  const toggleIcon = open ? (
    <ChevronRightRoundedIcon fontSize="inherit" />
  ) : (
    <ChevronLeftRoundedIcon fontSize="inherit" />
  );

  const handleChangeValue =
    (
      key: keyof (Pick<
        DesignElement,
        'x' | 'y' | 'rotation' | 'width' | 'height' | 'opacity' | 'fill'
      > &
        Pick<IRectangle, 'cornerRadius'>),
    ) =>
    (value: number | string) => {
      if (!selectedElement || !selectedElementId) return;

      sendUpdateElementMessage(selectedElementId, {
        ...selectedElement,
        [key]: value,
      });
    };

  return (
    <>
      <StyledDrawer
        openedWidth={OpenedDrawerWidth}
        variant="permanent"
        open={open}
        anchor="right"
      >
        <Row
          alignItems="center"
          justifyContent="space-between"
          sx={styles.activeUsersContainer}
        >
          <Typography variant="body1">
            {Labels.PropertiesSidebar.ActiveUsersSection.Header}
          </Typography>
          <JoinedUserGroup />
        </Row>
        <Divider />
        <StyledList
          subheader={
            shouldShowProperties && (
              <Typography sx={{ marginBottom: '8px' }}>
                {Labels.PropertiesSidebar.PropertiesSection.Header}
              </Typography>
            )
          }
          sx={styles.propertiesContainer}
        >
          {shouldShowProperties && (
            <Column gap={2}>
              <Typography variant="body2">
                {Labels.PropertiesSidebar.PropertiesSection.Position}
              </Typography>
              <Row gap={2}>
                <NumericTextField
                  label="X"
                  step={1}
                  value={Math.floor(selectedElement.x ?? 0)}
                  onChange={handleChangeValue('x')}
                />
                <NumericTextField
                  label="Y"
                  step={1}
                  value={Math.floor(selectedElement.y ?? 0)}
                  onChange={handleChangeValue('y')}
                />
              </Row>
              <Typography variant="body2">
                {Labels.PropertiesSidebar.PropertiesSection.Dimensions}
              </Typography>
              <Row gap={2}>
                <NumericTextField
                  label="W"
                  step={1}
                  min={0}
                  value={Math.floor(selectedElement.width ?? 0)}
                  onChange={handleChangeValue('width')}
                />
                <NumericTextField
                  label="H"
                  value={Math.floor(selectedElement.height ?? 0)}
                  onChange={handleChangeValue('height')}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      step: 1,
                    },
                  }}
                />
              </Row>
              <Typography variant="body2">
                {Labels.PropertiesSidebar.PropertiesSection.Appearance}
              </Typography>
              <Row gap={2} sx={{ width: '100%' }}>
                <NumericTextField
                  label={<SquareFootRoundedIcon />}
                  min={-180}
                  max={180}
                  step={5}
                  value={Math.floor(selectedElement.rotation ?? 0)}
                  onChange={handleChangeValue('rotation')}
                />
                <NumericTextField
                  label={<OpacityRoundedIcon />}
                  min={0}
                  max={1}
                  step={0.05}
                  value={selectedElement.opacity ?? 1}
                  onChange={handleChangeValue('opacity')}
                />
              </Row>
              <Typography variant="body2">
                {Labels.PropertiesSidebar.PropertiesSection.Fill}
              </Typography>
              <Row gap={2} sx={{ width: '100%' }}>
                <ColorTextField
                  label={<ColorLensRoundedIcon />}
                  value={(selectedElement.fill as string) ?? '#000000'}
                  onChange={handleChangeValue('fill')}
                />
              </Row>
            </Column>
          )}
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

const ColorTextField: FC<
  {
    label: string | ReactNode;
    value: string;
    onChange: (value: string) => void;
  } & Omit<TextFieldProps, 'value' | 'onChange' | 'label'>
> = ({ label, value, onChange, ...props }) => {
  const [draftColor, setDraftColor] = useState(value);

  const handleBlur = () => {
    onChange(draftColor);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDraftColor(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key === Keyboard.Enter) {
      e.preventDefault();
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      target.blur();
      handleBlur();
    }
  };

  useEffect(() => {
    if (draftColor !== value) {
      setDraftColor(value);
    }
  }, [setDraftColor, draftColor, value]);

  return (
    <TextField
      type="color"
      fullWidth
      value={draftColor}
      onChange={handleChangeColor}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      slotProps={{
        ...props?.slotProps,
        input: {
          ...props?.slotProps?.input,
          startAdornment:
            typeof label === 'string' ? (
              <Typography sx={{ marginRight: '8px' }}>{label}</Typography>
            ) : (
              label
            ),
        },
      }}
    />
  );
};

const NumericTextField: FC<
  {
    label: string | ReactNode;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
  } & Omit<TextFieldProps, 'value' | 'onChange' | 'label'>
> = ({ min, max, step = 1, label, value, onChange, ...props }) => {
  const [draftValue, setDraftValue] = useState(value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key === Keyboard.ArrowUp) {
      e.preventDefault();
      const newValue = value + step;
      const roundedValue = Math.round(newValue * 100) / 100;
      if (max && newValue > max) return;

      onChange(roundedValue);
      setDraftValue(roundedValue);
      return;
    }

    if (key === Keyboard.ArrowDown) {
      e.preventDefault();
      const newValue = value - step;
      if (min && newValue < min) return;

      const roundedValue = Math.round(newValue * 100) / 100;
      onChange(roundedValue);
      setDraftValue(roundedValue);
      return;
    }

    if (key === Keyboard.Enter) {
      e.preventDefault();
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      target.blur();
    }
  };

  const handleBlur = () => {
    onChange(draftValue);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;

    setDraftValue(newValue);
  };

  useEffect(() => {
    if (draftValue !== value) {
      setDraftValue(value);
    }
  }, [value, draftValue, setDraftValue]);

  return (
    <TextField
      fullWidth
      type="number"
      value={draftValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      slotProps={{
        ...props?.slotProps,
        input: {
          ...props?.slotProps?.input,
          type: 'number',
          startAdornment:
            typeof label === 'string' ? (
              <Typography sx={{ marginRight: '8px' }}>{label}</Typography>
            ) : (
              label
            ),
        },
        htmlInput: {
          ...props?.slotProps?.htmlInput,
          min,
          max,
          step,
        },
      }}
    />
  );
};

const OpenedDrawerWidth = 300;
export const createStyles: FunctionCreateStyles = () => {
  const containerStyles: SxProps = {
    padding: '10px',
  };

  return {
    activeUsersContainer: {
      ...containerStyles,
    },

    propertiesContainer: {
      ...containerStyles,
    },

    toggleIcon: {
      padding: '0px',
      fontSize: AppStyleVariable.iconFontSize.large,
    },
  };
};

export const createConditionalStyles: FunctionCreateConditionalStyles = (
  theme,
) => {
  return {
    toggleIconContainer: ({ open }) => ({
      borderTopLeftRadius: AppStyleVariable.borderRadius.small,
      borderBottomLeftRadius: AppStyleVariable.borderRadius.small,
      position: 'absolute',
      top: 10,
      border: '1px solid black',
      zIndex: 1,

      ...(open
        ? {
            right: OpenedDrawerWidth,
            ...AppStyleVariable.transition.open({ theme, props: ['right'] }),
          }
        : {
            right: 0,
            ...AppStyleVariable.transition.close({ theme, props: ['right'] }),
          }),
    }),
  };
};

export default PropertiesDrawer;
