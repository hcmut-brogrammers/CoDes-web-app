import React, { useCallback, useEffect, useRef } from 'react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

import useDesignProjectStore from '@/stores/design-project-store';
import { uuidToHashedColor } from '@/styles/helper';
import { IUserCursor } from '@/types/websocket';
import { generateRandomId } from '@/utils/common';

interface IProps {
  stageRef: React.RefObject<Nullable<Konva.Stage>>;
  layerRef: React.RefObject<Nullable<Konva.Layer>>;
}
export type UseAutoHighlightOtherSelectedElementProps = IProps;
const DELTA = 10;
const useAutoHighlightOtherSelectedElements = ({
  stageRef,
  layerRef,
}: IProps) => {
  const { getOtherUserCursors } = useDesignProjectStore();
  const highlightedElementsRef = useRef<Record<string, Konva.Shape>>({});

  const otherUserCursors = getOtherUserCursors();

  const handleHighlightSelectedElement = useCallback(
    (userCursors: IUserCursor[]) => {
      if (!layerRef.current || !stageRef.current) return;
      const stageScale = stageRef.current.scaleX();
      const stagePosition = stageRef.current.getAbsolutePosition();

      for (const userCursor of userCursors) {
        const selectedElementId = userCursor.selected_element_id;
        if (!selectedElementId) continue;

        const element = layerRef.current.findOne(
          getLayerElementId(selectedElementId),
        );
        if (
          !element ||
          Object.keys(highlightedElementsRef.current).includes(
            selectedElementId,
          )
        )
          return;

        const clientRect = element.getClientRect();
        const newPosition = calculatePosition({
          clientRect,
          stagePosition,
          stageScale,
          delta: DELTA,
        });
        const highlightedElement = makeHighlightedElement({
          userId: userCursor.user_id,
          ...newPosition,
        });
        layerRef.current.add(highlightedElement);
        highlightedElementsRef.current[element.id()] = highlightedElement;
      }
    },
    [layerRef, stageRef, highlightedElementsRef],
  );

  const handleRemoveHighlightedElement = useCallback(
    (userCursors: IUserCursor[]) => {
      const highlightedElementIds = Object.keys(highlightedElementsRef.current);
      const userCursorsSelectedElementIds = userCursors
        .map(({ selected_element_id }) => selected_element_id)
        .filter((elementId) => !!elementId);
      const deleteElementIds = highlightedElementIds.filter(
        (elementId) => !userCursorsSelectedElementIds.includes(elementId),
      );

      for (const deleteElementId of deleteElementIds) {
        const highlightedElement =
          highlightedElementsRef.current[deleteElementId];
        if (highlightedElement) {
          delete highlightedElementsRef.current[deleteElementId];
          highlightedElement.destroy();
        }
      }
    },
    [highlightedElementsRef],
  );

  useEffect(() => {
    handleHighlightSelectedElement(otherUserCursors);
    handleRemoveHighlightedElement(otherUserCursors);
  }, [
    handleHighlightSelectedElement,
    handleRemoveHighlightedElement,
    otherUserCursors,
  ]);
};

const calculatePosition = ({
  clientRect,
  delta,
  stagePosition,
  stageScale,
}: {
  clientRect: ReturnType<Konva.Node['getClientRect']>;
  delta: number;
  stageScale: number;
  stagePosition: Vector2d;
}) => {
  const x = Math.floor(
    Math.floor(clientRect.x - stagePosition.x) / stageScale - delta,
  );
  const y = Math.floor(
    Math.floor(clientRect.y - stagePosition.y) / stageScale - delta,
  );
  const width = Math.floor(
    Math.floor(clientRect.width / stageScale) + 2 * delta,
  );
  const height = Math.floor(
    Math.floor(clientRect.height / stageScale) + 2 * delta,
  );

  return { x, y, width, height };
};

const makeHighlightedElement = ({
  x,
  y,
  width,
  height,
  userId,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  userId: string;
}): Konva.Rect => {
  return new Konva.Rect({
    x,
    y,
    width,
    height,
    stroke: uuidToHashedColor(userId),
    strokeWidth: 2,
    dash: [10, 5],
    id: generateRandomId(),
  });
};

const getLayerElementId = (elementId: string) => `#${elementId}`;

export default useAutoHighlightOtherSelectedElements;
