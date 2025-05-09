import { ComponentProps, FC } from 'react';
import { Rect, Transformer } from 'react-konva';

import { IRectangle } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const RectangleElement: FC<
  {
    element: IRectangle;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof Rect>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <Rect {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
