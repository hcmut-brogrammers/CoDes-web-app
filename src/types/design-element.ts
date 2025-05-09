import { NodeConfig } from 'konva/lib/Node';
import { ShapeConfig } from 'konva/lib/Shape';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { RectConfig } from 'konva/lib/shapes/Rect';

import { ShapeType } from '@/constants/enum';

export interface INode
  extends Pick<
      NodeConfig,
      | 'x'
      | 'y'
      | 'width'
      | 'height'
      | 'visible'
      | 'listening'
      | 'name'
      | 'opacity'
      | 'scale'
      | 'scaleX'
      | 'skewX'
      | 'skewY'
      | 'scaleY'
      | 'rotation'
      | 'rotationDeg'
      | 'offset'
      | 'offsetX'
      | 'offsetY'
      | 'draggable'
      | 'dragDistance'
      | 'preventDefault'
      | 'globalCompositeOperation'
      | 'filters'
    >,
    Required<Pick<NodeConfig, 'id'>> {}

export interface IShape
  extends Pick<
      ShapeConfig,
      | 'fill'
      | 'fillPatternImage'
      | 'fillPatternX'
      | 'fillPatternY'
      | 'fillPatternOffset'
      | 'fillPatternOffsetX'
      | 'fillPatternOffsetY'
      | 'fillPatternScale'
      | 'fillPatternScaleX'
      | 'fillPatternScaleY'
      | 'fillPatternRotation'
      | 'fillPatternRepeat'
      | 'fillLinearGradientStartPoint'
      | 'fillLinearGradientStartPointX'
      | 'fillLinearGradientStartPointY'
      | 'fillLinearGradientEndPoint'
      | 'fillLinearGradientEndPointX'
      | 'fillLinearGradientEndPointY'
      | 'fillLinearGradientColorStops'
      | 'fillRadialGradientStartPoint'
      | 'fillRadialGradientStartPointX'
      | 'fillRadialGradientStartPointY'
      | 'fillRadialGradientEndPoint'
      | 'fillRadialGradientEndPointX'
      | 'fillRadialGradientEndPointY'
      | 'fillRadialGradientStartRadius'
      | 'fillRadialGradientEndRadius'
      | 'fillRadialGradientColorStops'
      | 'fillEnabled'
      | 'fillPriority'
      | 'fillRule'
      | 'stroke'
      | 'strokeWidth'
      | 'fillAfterStrokeEnabled'
      | 'hitStrokeWidth'
      | 'strokeScaleEnabled'
      | 'strokeHitEnabled'
      | 'strokeEnabled'
      | 'lineJoin'
      | 'lineCap'
      | 'shadowColor'
      | 'shadowBlur'
      | 'shadowOffset'
      | 'shadowOffsetX'
      | 'shadowOffsetY'
      | 'shadowOpacity'
      | 'shadowEnabled'
      | 'shadowForStrokeEnabled'
      | 'dash'
      | 'dashOffset'
      | 'dashEnabled'
      | 'perfectDrawEnabled'
    >,
    INode {
  shapeType: ShapeType;
}

export interface IRectangle extends Pick<RectConfig, 'cornerRadius'>, IShape {
  shapeType: ShapeType.Rectangle;
}

export interface ICircle extends Pick<CircleConfig, 'radius'>, IShape {
  shapeType: ShapeType.Circle;
}

export type DesignElement = IRectangle | ICircle;
