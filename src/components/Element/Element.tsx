import React, { ComponentProps, FC, Ref, useEffect, useRef } from 'react';
import { KonvaNodeEvents, Transformer } from 'react-konva';
import Konva from 'konva';

import { DesignElement } from '@/types/design-element';
import { isCircleElement, isRectangleElement } from '@/utils/design-project';

import { IBaseElementProps } from './BaseElement';
import { CircleElement } from './CircleElement';
import { RectangleElement } from './RectangleElement';

interface IProps<T extends DesignElement = DesignElement>
  extends IBaseElementProps {
  element: DesignElement;
  onSelect: (elementId: string) => void;
  onChange: (element: T) => void;
}

export const Element: FC<IProps> = ({ ...props }) => {
  const { element, onChange, onSelect, isSelected } = props;
  const elementRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const handleSelect = () => {
    onSelect(element.id);
  };

  const handleDragStart = () => {};

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const updatedElement: DesignElement = {
      ...element,
      x: e.target.x(),
      y: e.target.y(),
    };
    onChange(updatedElement);
  };

  const handleTransformerEnd = () => {
    // const attributes = e.target.getAttrs();
    const node = elementRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);
    const updatedElement: DesignElement = {
      ...element,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
      rotation: node.rotation(),
      skewX: node.skewX(),
      skewY: node.skewY(),
    };
    onChange(updatedElement);
  };

  const eventHandlers: KonvaNodeEvents = {
    onClick: handleSelect,
    onTap: handleSelect,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onTransformEnd: handleTransformerEnd,
  };

  const transformerProps: ComponentProps<typeof Transformer> = {
    ref: transformerRef as React.Ref<Konva.Transformer>,
    flipEnabled: false,
    boundBoxFunc: (oldBox, newBox) => {
      if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
        return oldBox;
      }
      return newBox;
    },
  };

  useEffect(() => {
    if (isSelected) {
      if (transformerRef?.current && elementRef?.current) {
        transformerRef.current.nodes([elementRef.current]);
      }
    }
  }, [isSelected]);

  if (isRectangleElement(element)) {
    return (
      <RectangleElement
        {...props}
        {...eventHandlers}
        ref={elementRef as Ref<Konva.Rect>}
        element={element}
        transformerProps={transformerProps}
      />
    );
  }

  if (isCircleElement(element)) {
    return (
      <CircleElement
        {...props}
        {...eventHandlers}
        ref={elementRef as Ref<Konva.Circle>}
        element={element}
        transformerProps={transformerProps}
      />
    );
  }

  return null;
};

export default Element;
