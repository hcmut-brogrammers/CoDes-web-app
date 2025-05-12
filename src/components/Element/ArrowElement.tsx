import { ComponentProps, FC } from 'react';
import { Arrow, Transformer } from 'react-konva';

import { IArrow } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const ArrowElement: FC<
  {
    element: IArrow;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof Arrow>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <Arrow {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
