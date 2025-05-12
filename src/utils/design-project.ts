import Konva from 'konva';

import { ShapeType } from '@/constants/enum';
import useDesignProjectStore from '@/stores/design-project-store';
import { AppColor } from '@/styles';
import {
  DesignElement,
  IArrow,
  ICircle,
  IEllipse,
  ILine,
  IRectangle,
  IRegularPolygon,
  IRing,
  IShape,
  IStar,
  IText,
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
  fill: AppColor.black,
  stroke: AppColor.black,
  strokeWidth: 1,
  opacity: 1,
  rotationDeg: 0,
  visible: true,
  scale: {
    x: 1,
    y: 1,
  },
  created_at: '',
  updated_at: undefined,
  deleted_at: undefined,
  is_deleted: false,
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

const DefaultText: IText = {
  ...DefaultShape,
  shapeType: ShapeType.Text,
  direction: 'inherit',
  text: 'Your text here',
  fill: AppColor.black,
  fontSize: 20,
  width: 80,
  height: 40,
};

const DefaultRing: IRing = {
  ...DefaultShape,
  shapeType: ShapeType.Ring,
  innerRadius: 20,
  outerRadius: 50,
};

const DefaultStar: IStar = {
  ...DefaultShape,
  shapeType: ShapeType.Star,
  innerRadius: 20,
  outerRadius: 50,
  numPoints: 5,
};

const DefaultLine: ILine = {
  ...DefaultShape,
  shapeType: ShapeType.Line,
  points: [0, 0, 100, 100],
  hitStrokeWidth: 10,
};

const DefaultArrow: IArrow = {
  ...DefaultLine,
  shapeType: ShapeType.Arrow,
  points: [0, 0, 100, 100],
  pointerLength: 20,
  pointerWidth: 20,
  strokeWidth: 4,
};

const DefaultEllipse: IEllipse = {
  ...DefaultShape,
  shapeType: ShapeType.Ellipse,
  radiusX: 50,
  radiusY: 30,
};

const DefaultTriangle: IRegularPolygon = {
  ...DefaultShape,
  shapeType: ShapeType.RegularPolygon,
  sides: 3,
  radius: 50,
};

export const createRectangleElement = (
  overrides?: Omit<IRectangle, 'shapeType'>,
): IRectangle => ({
  ...DefaultRectangle,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
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
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createTextElement = (
  overrides?: Omit<IText, 'shapeType'>,
): IText => ({
  ...DefaultText,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createRingElement = (
  overrides?: Omit<IRing, 'shapeType'>,
): IRing => ({
  ...DefaultRing,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createStarElement = (
  overrides?: Omit<IStar, 'shapeType'>,
): IStar => ({
  ...DefaultStar,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createLineElement = (
  overrides?: Omit<ILine, 'shapeType'>,
): ILine => ({
  ...DefaultLine,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createArrowElement = (
  overrides?: Omit<IArrow, 'shapeType'>,
): IArrow => ({
  ...DefaultArrow,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createEllipseElement = (
  overrides?: Omit<IEllipse, 'shapeType'>,
): IEllipse => ({
  ...DefaultEllipse,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createTriangleElement = (
  overrides?: Omit<IRegularPolygon, 'shapeType'>,
): IRegularPolygon => ({
  ...DefaultTriangle,
  shapeType: ShapeType.RegularPolygon,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  ...overrides,
});

export const createRegularPolygonElement = (
  overrides?: Omit<IRegularPolygon, 'shapeType'>,
): IRegularPolygon => ({
  ...DefaultShape,
  shapeType: ShapeType.RegularPolygon,
  id: generateRandomPrefixId(ELEMENT_TEMPORARY_ID_PREFIX),
  name: generateElementName(),
  x: Math.floor(Math.random() * 1000),
  y: Math.floor(Math.random() * 1000),
  fill: Konva.Util.getRandomColor(),
  sides: 5,
  radius: 50,
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

export const isTextElement = (element: DesignElement): element is IText => {
  return element.shapeType === ShapeType.Text;
};

export const isRingElement = (element: DesignElement): element is IRing => {
  return element.shapeType === ShapeType.Ring;
};

export const isStarElement = (element: DesignElement): element is IStar => {
  return element.shapeType === ShapeType.Star;
};

export const isLineElement = (element: DesignElement): element is ILine => {
  return element.shapeType === ShapeType.Line;
};

export const isArrowElement = (element: DesignElement): element is IArrow => {
  return element.shapeType === ShapeType.Arrow;
};

export const isEllipseElement = (
  element: DesignElement,
): element is IEllipse => {
  return element.shapeType === ShapeType.Ellipse;
};

export const isRegularPolygonElement = (
  element: DesignElement,
): element is IRegularPolygon => {
  return element.shapeType === ShapeType.RegularPolygon;
};

export const isTriangleElement = (
  element: DesignElement,
): element is IRegularPolygon => {
  return isRegularPolygonElement(element) && element.sides === 3;
};

export const generateElementName = (): string => {
  const { elements } = useDesignProjectStore.getState();
  return `Element #${elements.length + 1}`;
};
