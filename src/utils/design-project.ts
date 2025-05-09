import Konva from 'konva';

import { ShapeType } from '@/constants/enum';
import {
  DesignElement,
  ICircle,
  IRectangle,
  IShape,
} from '@/types/design-element';

import { generateRandomPrefixId } from './common';

const ELEMENT_TEMPORARY_ID_PREFIX = 'ELEMENT_TEMPORARY_ID';

const DefaultShape: IShape = {
  id: '',
  shapeType: ShapeType.Rectangle,
  draggable: true,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  skewX: 0,
  skewY: 0,
  x: 40,
  y: 40,
  width: 80,
  height: 80,
  fill: 'green',
};

const DefaultRectangle: IRectangle = {
  ...DefaultShape,
  shapeType: ShapeType.Rectangle,
  cornerRadius: 4,
};

const DefaultCircle: ICircle = {
  ...DefaultShape,
  shapeType: ShapeType.Circle,
  radius: 50,
};

export const createRectangleElement = (
  overrides?: Omit<IRectangle, 'shapeType'>,
): IRectangle => ({
  ...DefaultRectangle,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createCircleElement = (
  overrides?: Omit<ICircle, 'shapeType'>,
): ICircle => ({
  ...DefaultCircle,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const isRectangleElement = (
  element: DesignElement,
): element is IRectangle => {
  return element.shapeType === ShapeType.Rectangle;
};

export const isCircleElement = (element: DesignElement): element is ICircle => {
  return element.shapeType === ShapeType.Circle;
};
