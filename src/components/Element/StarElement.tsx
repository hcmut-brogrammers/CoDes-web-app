import { ComponentProps, FC } from 'react';
import { Star, Transformer } from 'react-konva';

import { IStar } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const StarElement: FC<
  {
    element: IStar;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof Star>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <Star {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
