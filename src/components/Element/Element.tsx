import React, { ComponentProps, FC, memo, Ref, useEffect, useRef } from 'react';
import { KonvaNodeEvents, Transformer } from 'react-konva';
import Konva from 'konva';

import { DesignElement } from '@/types/design-element';
import {
  isArrowElement,
  isCircleElement,
  isLineElement,
  isRectangleElement,
  isRingElement,
  isStarElement,
  isTextElement,
  isTriangleElement,
} from '@/utils/design-project';

import { ArrowElement } from './ArrowElement';
import { IBaseElementProps } from './BaseElement';
import { CircleElement } from './CircleElement';
import { LineElement } from './LineElement';
import { RectangleElement } from './RectangleElement';
import { RingElement } from './RingElement';
import { StarElement } from './StarElement';
import { TextElement } from './TextElement';
import { TriangleElement } from './TriangleElement';

interface IProps<T extends DesignElement = DesignElement>
  extends IBaseElementProps {
  element: DesignElement;
  onSelect: (elementId: string) => void;
  onChange: (element: T) => void;
}

export const Element: FC<IProps> = memo(({ ...props }) => {
  const { element, onChange, onSelect, isSelected } = props;
  const elementRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const handleSelect = () => {
    onSelect(element.id);
  };

  const handleDragStart = () => {
    handleSelect();
  };

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
      x: Math.floor(node.x()),
      y: Math.floor(node.y()),
      // set minimal value
      width: Math.floor(Math.max(5, node.width() * scaleX)),
      height: Math.floor(Math.max(node.height() * scaleY)),
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

  const renderElement = () => {
    if (isRectangleElement(element)) {
      return (
        <RectangleElement
          {...element}
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
          {...element}
          {...props}
          {...eventHandlers}
          ref={elementRef as Ref<Konva.Circle>}
          element={element}
          transformerProps={transformerProps}
        />
      );
    }

    if (isTextElement(element)) {
      return (
        <TextElement
          {...element}
          {...props}
          {...eventHandlers}
          ref={elementRef as Ref<Konva.Text>}
          element={element}
          transformerProps={transformerProps}
        />
      );
    }

    if (isRingElement(element)) {
      return (
        <RingElement
          {...element}
          {...props}
          {...eventHandlers}
          ref={elementRef as Ref<Konva.Ring>}
          element={element}
          transformerProps={transformerProps}
        />
      );
    }

    if (isStarElement(element)) {
      return (
        <StarElement
          {...element}
          {...props}
          {...eventHandlers}
          ref={elementRef as Ref<Konva.Star>}
          element={element}
          transformerProps={transformerProps}
        />
      );
    }

    if (isLineElement(element)) {
      return (
        <LineElement
          {...element}
          {...props}
          {...eventHandlers}
          ref={elementRef as Ref<Konva.Line>}
          element={element}
          transformerProps={transformerProps}
        />
      );
    }

    if (isArrowElement(element)) {
      return (
        <ArrowElement
          {...element}
          {...props}
          {...eventHandlers}
          ref={elementRef as Ref<Konva.Arrow>}
          element={element}
          transformerProps={transformerProps}
        />
      );
    }

    if (isTriangleElement(element)) {
      return (
        <TriangleElement
          {...element}
          {...props}
          {...eventHandlers}
          ref={elementRef as Ref<Konva.RegularPolygon>}
          element={element}
          transformerProps={transformerProps}
        />
      );
    }

    return null;
  };

  return <>{renderElement()}</>;
});

export default Element;
