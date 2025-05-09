import { ComponentProps, FC } from 'react';
import { Circle, Transformer } from 'react-konva';

import { ICircle } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const CircleElement: FC<
  {
    element: ICircle;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof Circle>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <Circle {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
