import { ComponentProps, FC } from 'react';
import { RegularPolygon, Transformer } from 'react-konva';

import { IRegularPolygon } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const TriangleElement: FC<
  {
    element: IRegularPolygon;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof RegularPolygon>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <RegularPolygon {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
