import { ComponentProps, FC } from 'react';
import { Ring, Transformer } from 'react-konva';

import { IRing } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const RingElement: FC<
  {
    element: IRing;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof Ring>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <Ring {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
