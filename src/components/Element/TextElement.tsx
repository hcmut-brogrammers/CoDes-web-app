import { ComponentProps, FC } from 'react';
import { Text, Transformer } from 'react-konva';

import { IText } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const TextElement: FC<
  {
    element: IText;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof Text>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <Text {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
