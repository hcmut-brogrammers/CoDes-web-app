import { NodeConfig } from 'konva/lib/Node';
import { ShapeConfig } from 'konva/lib/Shape';
import { ArrowConfig } from 'konva/lib/shapes/Arrow';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { LineConfig } from 'konva/lib/shapes/Line';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { RegularPolygonConfig } from 'konva/lib/shapes/RegularPolygon';
import { RingConfig } from 'konva/lib/shapes/Ring';
import { StarConfig } from 'konva/lib/shapes/Star';
import { TextConfig } from 'konva/lib/shapes/Text';

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
    Required<Pick<NodeConfig, 'id'>> {
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  is_deleted: boolean;
}

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

interface IPickedRectConfig extends Pick<RectConfig, 'cornerRadius'> {}
export interface IRectangle extends IPickedRectConfig, IShape {
  shapeType: ShapeType.Rectangle;
}

interface IPickedCircleConfig extends Pick<CircleConfig, 'radius'> {}
export interface ICircle extends IPickedCircleConfig, IShape {
  shapeType: ShapeType.Circle;
}

interface IPickedLineConfig
  extends Pick<LineConfig, 'points' | 'tension' | 'closed' | 'bezier'> {}
export interface ILine extends IPickedLineConfig, IShape {
  shapeType: ShapeType.Line;
}

interface IPickedArrowConfig
  extends Pick<
    ArrowConfig,
    | 'points'
    | 'tension'
    | 'closed'
    | 'pointerLength'
    | 'pointerWidth'
    | 'pointerAtBeginning'
    | 'pointerAtEnding'
  > {}
export interface IArrow
  extends Omit<IPickedLineConfig, 'points'>,
    IPickedArrowConfig,
    IShape {
  shapeType: ShapeType.Arrow;
}

interface IPickedEllipseConfig
  extends Pick<EllipseConfig, 'radiusX' | 'radiusY'> {}
export interface IEllipse extends IPickedEllipseConfig, IShape {
  shapeType: ShapeType.Ellipse;
}
interface IPickedRegularPolygonConfig
  extends Pick<RegularPolygonConfig, 'sides' | 'radius'> {}
export interface IRegularPolygon extends IPickedRegularPolygonConfig, IShape {
  shapeType: ShapeType.RegularPolygon;
}

interface IPickedRingConfig
  extends Pick<RingConfig, 'innerRadius' | 'outerRadius'> {}

export interface IRing extends IPickedRingConfig, IShape {
  shapeType: ShapeType.Ring;
}

interface IPickedStarConfig
  extends Pick<StarConfig, 'numPoints' | 'innerRadius' | 'outerRadius'> {}

export interface IStar extends IPickedStarConfig, IShape {
  shapeType: ShapeType.Star;
}

interface IPickedTextConfig
  extends Pick<
    TextConfig,
    | 'direction'
    | 'text'
    | 'fontFamily'
    | 'fontSize'
    | 'fontStyle'
    | 'fontVariant'
    | 'textDecoration'
    | 'align'
    | 'verticalAlign'
    | 'padding'
    | 'lineHeight'
    | 'letterSpacing'
    | 'wrap'
    | 'ellipsis'
  > {}

export interface IText extends IPickedTextConfig, IShape {
  shapeType: ShapeType.Text;
}

export type DesignElement =
  | IRegularPolygon
  | IRing
  | IStar
  | IText
  | ILine
  | IArrow
  | IEllipse
  | IRectangle
  | ICircle;
