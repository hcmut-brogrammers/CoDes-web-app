import { ComponentProps, FC } from 'react';
import { Line, Transformer } from 'react-konva';

import { ILine } from '@/types/design-element';

import { IBaseElementProps } from './BaseElement';

export const LineElement: FC<
  {
    element: ILine;
    transformerProps?: ComponentProps<typeof Transformer>;
  } & Pick<IBaseElementProps, 'isSelected'> &
    ComponentProps<typeof Line>
> = ({ isSelected, element, transformerProps, ...props }) => {
  return (
    <>
      <Line {...props} {...element} />
      {isSelected && <Transformer {...transformerProps} />}
    </>
  );
};
